from django.urls import path
from . import views

urlpatterns = [
    path('get_name', view=views.get_first_name, name="get_name"),
    path('get_plan', view=views.get_plan, name="get_plan"),
    path('create_plan', view=views.create_plan, name="create_plan")
]