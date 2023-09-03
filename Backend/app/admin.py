from django.contrib import admin
from .models import tasks

# Register your models here.
@admin.register(tasks)
class taskAdmin(admin.ModelAdmin):
    list_display = ['task_id', 'tasks_desc', 'status', 'created']
