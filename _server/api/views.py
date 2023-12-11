from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict

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

