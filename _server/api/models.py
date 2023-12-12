from django.db import models
from core.models import Profile
from django.core.validators import MinValueValidator


class Plan(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='plan')


class Week(models.Model):
    id = models.BigAutoField(primary_key=True)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='weeks')

class Day(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, null=True)
    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name='days')

class Exercise(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True)
    sets = models.IntegerField(validators=[MinValueValidator(1)], null=True)
    reps = models.IntegerField(validators=[MinValueValidator(1)], null=True)
    weight = models.IntegerField(validators=[MinValueValidator(0)], null=True)
    day = models.ForeignKey(Day, on_delete=models.CASCADE, related_name='exercises')

