from django.urls import path
from . import views

urlpatterns = [
    path('get_name', view=views.get_first_name, name="get_name")
]