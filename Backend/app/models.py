from django.db import models

class tasks(models.Model):
    task_id = models.AutoField(primary_key=True)
    tasks_desc = models.TextField()
    status = models.CharField(max_length=50, default="In Progress")
    created = models.DateTimeField(auto_now_add=True, blank=True)
  
