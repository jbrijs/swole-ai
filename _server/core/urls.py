from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('profile/', view=views.set_profile, name="profile")
]