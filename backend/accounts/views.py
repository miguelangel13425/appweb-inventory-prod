from rest_framework import generics, status
from core.mixins import CustomResponseMixin
from .models import UserModel
from .serializers import (
    UserListSerializer, UserDetailSerializer
)

# Create your views here.

class UserListView(CustomResponseMixin, generics.ListAPIView):
    def get_queryset(self):
        return UserModel.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = UserListSerializer(queryset, many=True)
        return self.custom_response(
            data=serializer.data, 
            message='Fetched users successfully!',
            status_code=status.HTTP_200_OK
        )

class UserDetailView(CustomResponseMixin, generics.RetrieveAPIView):
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return UserModel.objects.filter(id=pk, is_active=True)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = UserDetailSerializer(instance)
        return self.custom_response(
            data=serializer.data,
            message='Fetched user successfully!',
            status_code=status.HTTP_200_OK
        )
    
class CurrentUserView(CustomResponseMixin, generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserDetailSerializer(user)
        return self.custom_response(
            data=serializer.data,
            message='Fetched current user successfully!',
            status_code=status.HTTP_200_OK
        )