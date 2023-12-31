# Generated by Django 4.2.4 on 2023-11-22 03:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                (
                    "sex",
                    models.CharField(
                        choices=[
                            ("M", "Male"),
                            ("F", "Female"),
                            ("U", "Do not wish to specify/Other"),
                        ],
                        max_length=1,
                    ),
                ),
                ("age", models.IntegerField(blank=True, null=True)),
                (
                    "experience",
                    models.CharField(
                        choices=[
                            ("N", "Novice"),
                            ("B", "Beginner"),
                            ("I", "Intermediate"),
                            ("A", "Advanced"),
                        ],
                        max_length=1,
                    ),
                ),
                (
                    "goals",
                    models.CharField(
                        choices=[
                            ("S", "Strength"),
                            ("F", "Fat loss"),
                            ("M", "Muscle gain"),
                        ],
                        max_length=1,
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
