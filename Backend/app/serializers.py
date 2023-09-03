from rest_framework import serializers
from .models import tasks


class tasksSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = tasks
        fields = [ 'task_id', 'tasks_desc', 'status', 'created']