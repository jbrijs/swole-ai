# Generated by Django 4.2.4 on 2024-01-12 00:24

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0004_remove_exercise_day_remove_week_plan_delete_day_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="thread_id",
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
