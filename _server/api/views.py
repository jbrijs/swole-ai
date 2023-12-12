import json
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from .models import Plan, Week, Day, Exercise

# Create your views here.

@login_required
def get_first_name(req):
    name = req.user.first_name
    return JsonResponse({"name": name})

@login_required
def get_plan(req):
    plan = req.user.profile.plan
    if plan:
        return JsonResponse({"plan": plan})
    return

@login_required
def create_plan(req):
    if req.method == "POST":
        data = json.loads(req.body)
        profile = req.user.profile
        plan = Plan.objects.create(name=data['name'], profile=profile)

        for week_data in data['weeks']:
            week = Week.objects.create(plan=plan)
            for day_data in week_data['days']:
                day = Day.objects.create(name=day_data['name'], week=week)
                for exercise_data in day_data['exercises']:
                    Exercise.objects.create(
                        name=exercise_data['name'],
                        sets=exercise_data['sets'],
                        reps=exercise_data['reps'],
                        day=day
                    )
        plan.save()
        return JsonResponse({"plan": model_to_dict(plan)})
    return JsonResponse({"error": "Invalid request"}, status=400)

