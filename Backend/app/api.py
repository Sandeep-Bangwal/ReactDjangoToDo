from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import tasks
from .serializers import tasksSerializer 
from django.views.decorators.csrf import csrf_exempt

class taskView(APIView):
     def get(self,request, format=None,):
        query = tasks.objects.all().order_by('-created')
        serializer = tasksSerializer(query,  many=True)
        return Response(serializer.data, status=status.HTTP_302_FOUND)
     
     @csrf_exempt
     def post(self, request, format=None):
         print(request.data)
         serializer = tasksSerializer(data=request.data)
         if serializer.is_valid():
             serializer.save()
             context = {
                 'msg': 'created..'
             }
             return Response(serializer.data, status=status.HTTP_201_CREATED)
         print(serializer.errors)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     @csrf_exempt
     def patch(self, request, id,format=None):
        query = tasks.objects.get(pk = id)
        serializer = tasksSerializer(query, data=request.data, partial = True)
        if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
     
     def delete(self, request, id,format=None):
        print(id)
        try:
            task = tasks.objects.get(task_id=id)
            task.delete()
            return Response({'msg': 'deleted'}, status=status.HTTP_200_OK)
        except tasks.DoesNotExist:
            return Response({'msg': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    
         
      
