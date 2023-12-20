from django.forms import model_to_dict
from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from  core.models import Profile
from django.http import JsonResponse

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def set_profile(req):
    body = json.loads(req.body)

    profile, created = Profile.objects.get_or_create(user=req.user)

    profile.age = body['age']
    profile.sex = body['sex']
    profile.goal = body['goal']
    profile.experience = body['experience']

    profile.save()
    
    return JsonResponse({"profile": model_to_dict(profile)})

@login_required
def get_profile(req):
    profile = req.user.profile
    return JsonResponse({"profile": model_to_dict(profile)})