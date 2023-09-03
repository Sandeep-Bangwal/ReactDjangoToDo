from rest_framework import serializers
from .models import tasks


class tasksSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%d-%m-%Y %H:%M', read_only=True)
    class Meta:
        model = tasks
        fields = [ 'task_id', 'tasks_desc', 'status', 'created']