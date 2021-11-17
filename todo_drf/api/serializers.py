from rest_framework import serializers
from . models import Task

# Serializers return a Model object in a JSON reponse
class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = '__all__'