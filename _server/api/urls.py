from django.urls import path
from . import views

urlpatterns = [
    path('get_name', view=views.get_first_name, name="get_name"),
    path('user_plan', view=views.get_plan, name="get_plan")
]