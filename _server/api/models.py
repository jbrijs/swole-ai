from django.db import models
from core.models import Profile

class Plan(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='plan')


class Week(models.Model):
    id = models.BigAutoField(primary_key=True)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='weeks')

class Day(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name='days')

class Exercise(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    sets = models.IntegerField()
    reps = models.IntegerField()
    day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='exercises')

