from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.

class Task(models.Model):
  user = models.ForeignKey(User, on_delete=CASCADE, default='')
  title = models.CharField(max_length=200)
  completed = models.BooleanField(blank=True, default=False, null=True)

  def __str__(self):
    return f'{self.id} - {self.title}'