# from django.http.response import JsonResponse
from django.shortcuts import render
# from django.http import JsonResponse

# REST Framework
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Task
from .serializers import TaskSerializer

# Simple JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def apiOverview(request):
  api_urls = {
    'List': '/task-list/',
    'Detail View': '/task-detail/<str:pk>',
    'Create': 'task-create/',
    'Update': 'task-update/<str:pk>',
    'Delete': 'task-delete/<str:pk>',
  }
  return Response(api_urls)


@api_view(['GET'])
def taskList(request):
  tasks = Task.objects.all()
  serializer = TaskSerializer(tasks, many=True)
  return Response(serializer.data)


@api_view(['GET'])
def taskDetail(request, pk):
  task = Task.objects.get(id=pk)
  serializer = TaskSerializer(task, many=False)
  return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
  serializer = TaskSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()  
  return Response(serializer.data)


@api_view(['POST'])
def taskUpdate(request, pk):
  task = Task.objects.get(id=pk)
  serializer = TaskSerializer(instance=task, data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
  task = Task.objects.get(id=pk)
  task.delete()

  return Response('Item deleted!')