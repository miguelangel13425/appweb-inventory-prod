from rest_framework import generics, status
from rest_framework.exceptions import ValidationError, PermissionDenied
from core.mixins import CustomResponseMixin
from django.shortcuts import get_object_or_404
from accounts.models import ProfileModel
from accounts.serializers import (
    ProfileListSerializer,
    ProfileDetailSerializer, ProfileUpdateSerializer
)
from inventory.permissions import IsAdmin
from django.db.models import Q
from django.http import Http404
from rest_framework.pagination import PageNumberPagination

class ProfileListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = ProfileModel.objects.all()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(user__first_name__icontains=search_term) |
                Q(user__last_name__icontains=search_term) |
                Q(user__email__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = ProfileListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='profiles',
                data=serializer.data,
                message='¡Perfiles encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_PROFILES_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PROFILES_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class ProfileDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return ProfileModel.objects.all()

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(ProfileModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = ProfileDetailSerializer(instance)
            return self.custom_response(
                data_key='profile',
                data=serializer.data,
                message='¡Perfil encontrado con éxito!',
                detail_code='FETCH_PROFILE_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='Usted no posee permiso para acceder a este recurso.',
                detail_code='FETCH_PROFILE_PERMISSION_ERROR',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Perfil no encontrado.',
                detail_code='FETCH_PROFILE_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='FETCH_PROFILE_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PROFILE_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(ProfileModel, pk=instance.pk)
            serializer = ProfileUpdateSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='profile',
                data=serializer.data,
                message='¡Perfil actualizado con éxito!',
                detail_code='UPDATE_PROFILE_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Perfil no encontrado.',
                detail_code='UPDATE_PROFILE_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='UPDATE_PROFILE_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='UPDATE_PROFILE_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    '''def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(ProfileModel, pk=instance.pk)
            instance.delete()
            return self.custom_response(
                data_key='profile',
                data=None,
                message='¡Perfil eliminado con éxito!',
                detail_code='DELETE_PROFILE_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Perfil no encontrado.',
                detail_code='DELETE_PROFILE_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='DELETE_PROFILE_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )'''
