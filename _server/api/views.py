import json
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from .models import Plan, Week, Day, Exercise
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from .services import check_run_status, create_thread, add_message, get_last_message, run_assistant

@login_required
def get_user_info(req):
    user = req.user
    profile = user.profile
    return JsonResponse({"name": user.first_name, "sex": profile.get_sex_display(),
                          "age": profile.age, "goal": profile.get_goal_display(),
                            "experience": profile.get_experience_display()})

@login_required
def get_plan(request):
    try:
        plan = request.user.profile.plan
        if not plan:
            raise ObjectDoesNotExist

        weeks = Week.objects.filter(plan=plan).prefetch_related('days__exercises')
        weeks_data = []
        for week in weeks:
            days_data = []
            for day in week.days.all():
                exercises_data = []
                for exercise in day.exercises.all():
                    exercises_data.append({
                        'id': exercise.id,
                        'name': exercise.name,
                        'sets': exercise.sets,
                        'reps': exercise.reps,
                        'weight': exercise.weight,
                    })
                days_data.append({
                    'id': day.id,
                    'name': day.name,
                    'exercises': exercises_data,
                })
            weeks_data.append({'id': week.id, 'days': days_data})
        return JsonResponse({'plan': {'id': plan.id, 'name': plan.name, 'weeks': weeks_data}})

    except ObjectDoesNotExist:
        return JsonResponse({'plan': None})

@login_required
def create_plan(req):
    if req.method == "POST":
        data = json.loads(req.body)
        profile = req.user.profile

        with transaction.atomic():
            plan = Plan.objects.create(name=data['name'], profile=profile)

            for week_data in data['weeks']:
                week = Week.objects.create(plan=plan)
                for day_data in week_data['days']:
                    day = Day.objects.create(name=day_data['name'], week=week)
                    for exercise_data in day_data['exercises']:
                        try:
                            sets = int(exercise_data['sets'])
                            reps = int(exercise_data['reps'])
                            weight = float(exercise_data['weight'])
                        except ValueError:
                            transaction.set_rollback(True)
                            return JsonResponse({'error': 'Sets, reps, and weight must be numbers'}, status=400)

                        if sets < 0 or reps < 0 or weight < 0:
                            transaction.set_rollback(True)
                            return JsonResponse({'error': 'Sets, reps, and weight must be positive numbers'}, status=400)

                        Exercise.objects.create(
                            name=exercise_data['name'],
                            sets=sets,
                            reps=reps,
                            weight=weight,
                            day=day
                        )

            return JsonResponse({"plan": model_to_dict(plan)}, status=200)  # End of atomic transaction block





@login_required
def delete_plan(req):
    plan = get_object_or_404(Plan, profile=req.user.profile)
    plan.delete()
    return JsonResponse({"message": "Plan deleted successfully"}, status=200)


@login_required
def edit_plan(request):
    data = json.loads(request.body)
    plan = request.user.profile.plan

    with transaction.atomic():
        for week_data in data['weeks']:
            week = Week.objects.filter(plan=plan, id=week_data['id']).first()

            for day_data in week_data['days']:
                day = Day.objects.filter(week=week, id=day_data['id']).first()

                for exercise_data in day_data['exercises']:
                    exercise = Exercise.objects.filter(day=day, id=exercise_data['id']).first()
                    if exercise:
                        exercise.name = exercise_data.get('name', exercise.name)

                        try:
                            sets = int(exercise_data['sets'])
                            reps = int(exercise_data['reps'])
                            weight = float(exercise_data['weight'])
                        except ValueError:
                            transaction.set_rollback(True)
                            return JsonResponse({'error': 'Sets, reps, and weight must be numbers'}, status=400)

                        if sets < 0 or reps < 0 or weight < 0:
                            transaction.set_rollback(True)
                            return JsonResponse({'error': 'Sets, reps, and weight must be non-negative'}, status=400)

                        exercise.sets = sets
                        exercise.reps = reps
                        exercise.weight = weight

                        exercise.save()

        return JsonResponse({'message': 'Plan updated successfully'}, status=200)
    
@login_required
def get_ai_plan(req):
    ''' 
    Gets user info and makes a thread if the user doesn't
    have a thread id attached to their profile.
    Adds a message to the thread, starts the run, 
    and the returns the last message in the thread (which should be the plan).
    '''

    user = req.user
    user_data = get_profile_data(req)
    user_thread_id = get_thread_id(req)

    if user_thread_id:
        return process_user_interaction(user_thread_id, user_data)
    else:
        new_thread = create_thread()
        user.thread_id = new_thread.id
        return process_user_interaction(new_thread.id, user_data, user)

@login_required
def get_profile_data(req):
    user = req.user
    user_name = req.user.first_name
    profile = user.profile
    sex = profile.get_sex_display()
    goal = profile.get_goal_display()
    experience = profile.get_experience_display()
    age = profile.age
    return f"User Name: {user_name}, Sex: {sex}, Goal: {goal}, Experience: {experience}, Age: {age}"

@login_required
def get_thread_id(req):
    return req.user.profile.thread_id
    
def process_user_interaction(thread_id, user_data, user):
    """
    Handles interaction with the OpenAI assistant for a given thread.
    It sends a message to the thread, runs the assistant, checks the run status,
    and retrieves the last message as the plan.
    
    Parameters:
        thread_id (str): The ID of the thread for the interaction.
        user_data (dict): Data about the user to send to the assistant.

    Returns:
        JsonResponse: The response containing the plan or an error message.
    """
    add_message(thread_id=thread_id, user_data=user_data)
    run = run_assistant(thread_id)

    run_status = check_run_status(thread_id=thread_id, run_id=run.id)
    if run_status == "completed":
        plan = get_last_message(thread_id=thread_id)
        print(plan)
        try:
            plan_json = json.loads(plan)
            save_plan_to_profile(user, plan_json)
            return JsonResponse({'plan':plan_json})
        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)
            return JsonResponse({'error': 'error decoding json'}, status=500)

    else:
        return JsonResponse({'error': run_status}, status=500)

def save_plan_to_profile(user, plan_data):
    with transaction.atomic():
        profile = user.profile
        plan = Plan.objects.create(profile=profile)
    
        for week_data in plan_data['weeks']:
            week = Week.objects.create(plan=plan)
            for day_data in week_data['days']:
                day = Day.objects.create(name=day_data['name'], week=week)
                for exercise_data in day_data['exercises']:
                    Exercise.objects.create(
                        name=exercise_data['name'],
                        sets=exercise_data['sets'],
                        reps=exercise_data['reps'],
                        weight=exercise_data['weight'],
                        day=day
                    )
        plan.save()