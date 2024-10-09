from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from inventory.permissions import IsAdmin
from core.mixins import CustomResponseMixin
from accounts.models import UserModel
from accounts.serializers import (
    UserListSerializer, UserDetailSerializer
)
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.http import Http404
from django.db.models import Q

# Create your views here.

class UserListView(CustomResponseMixin, generics.ListAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = UserModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(first_name__icontains=search_term) |
                Q(last_name__icontains=search_term) |
                Q(email__icontains=search_term) |
                Q(role__name__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = UserListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='users',
                data=serializer.data,
                message='¡Usuarios encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_USERS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_USERS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
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