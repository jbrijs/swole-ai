from django.db import models

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)  # Ensures that email is unique across users

class Profile(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    class Sex(models.TextChoices):
        MALE = 'M', 'Male'
        FEMALE = 'F', 'Female'
        UNSPECIFIED = 'U', 'Do not wish to specify/Other'
    sex = models.CharField(max_length=1, choices=Sex.choices)

    age = models.IntegerField(null=True, blank=True)

    class Experience(models.TextChoices):
        NOVICE = 'N', 'Novice'
        BEGINNER = 'B', 'Beginner'
        INTERMEDIATE = 'I', 'Intermediate'
        ADVANCED = 'A', 'Advanced'
    experience = models.CharField(max_length=1, choices=Experience.choices)

    class Goals(models.TextChoices):
        STRENGTH = 'S', 'Strength'
        FAT_LOSS = 'F', 'Fat loss'
        MUSCLE_GAIN = 'M', 'Muscle gain'
    goals = models.CharField(max_length=1, choices=Goals.choices)

class Plan(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

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
