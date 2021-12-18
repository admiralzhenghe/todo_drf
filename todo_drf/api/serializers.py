from django.contrib.auth.hashers import make_password
# Models
from . models import Task
from django.contrib.auth.models import User
# Rest Framework
from rest_framework import serializers

# Serializers return a Model object in a JSON reponse
class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = '__all__'