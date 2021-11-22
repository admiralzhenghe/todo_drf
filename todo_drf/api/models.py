from django.db import models
from django.db.models.expressions import F

# Create your models here.
class Task(models.Model):
  title = models.CharField(max_length=200)
  completed = models.BooleanField(blank=True, default=False, null=True)

  def __str__(self):
    return f'{self.id} - {self.title}'