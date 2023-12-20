from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('profile/', view=views.set_profile, name="profile"),
    path('get_profile', view=views.get_profile, name="get_profile")
]