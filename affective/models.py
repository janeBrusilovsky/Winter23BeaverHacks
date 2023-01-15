from django.db import models


class IdentifyResult(models.Model):
    username = models.CharField(max_length=150)
    time_played = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(default=0)


class CopyResult(models.Model):
    username = models.CharField(max_length=150)
    time_played = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(default=0)
