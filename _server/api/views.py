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

@login_required
def get_first_name(req):
    name = req.user.first_name
    return JsonResponse({"name": name})

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
