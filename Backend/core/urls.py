from django.contrib import admin
from django.urls import path
from app import api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/', api.taskView.as_view()),
    path('todo/<int:id>/', api.taskView.as_view()),
]
