from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game_type = models.IntegerField(default=0)
    time_played = models.DateTimeField
    score = models.IntegerField(default=0)
