# Generated by Django 4.1.5 on 2023-01-15 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('affective', '0003_copyresult_time_played_identifyresult_time_played'),
    ]

    operations = [
        migrations.AlterField(
            model_name='copyresult',
            name='time_played',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='identifyresult',
            name='time_played',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
