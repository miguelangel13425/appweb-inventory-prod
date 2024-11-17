from rest_framework import generics, status
from rest_framework.exceptions import ValidationError, NotFound
from django.core.exceptions import ObjectDoesNotExist
from accounts.models import ProviderModel
from accounts.serializers import (
    ProviderListSerializer, ProviderDetailSerializer,
    ProviderCreateUpdateSerializer, ProviderOptionSerializer
)
from core.mixins import CustomResponseMixin
from inventory.permissions import (
    IsAdmin, IsEmployee, IsViewer
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from core.pagination import SmallPageNumberPagination

class ProviderOptionView(CustomResponseMixin, generics.ListAPIView):
    permission_classes = [IsAdmin | IsEmployee]
    pagination_class = SmallPageNumberPagination

    def get_queryset(self):
        queryset = ProviderModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        specific_id = self.request.query_params.get('id', None)
        
        if specific_id:
            queryset = queryset.filter(id=specific_id)

        if search_term:
            queryset = queryset.filter(
                Q(first_name__icontains=search_term) |
                Q(last_name__icontains=search_term) |
                Q(email__icontains=search_term) |
                Q(RFC__icontains=search_term) |
                Q(NSS__icontains=search_term)
            )
        return queryset
    
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = ProviderOptionSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='providers',
                data=serializer.data,
                message='¡Proveedores encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_PROVIDERS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PROVIDERS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class ProviderListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin | IsEmployee | IsViewer]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = ProviderModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(first_name__icontains=search_term) |
                Q(last_name__icontains=search_term) |
                Q(email__icontains=search_term) |
                Q(RFC__icontains=search_term) |
                Q(NSS__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = ProviderListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='providers',
                data=serializer.data,
                message='¡Proveedores encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_PROVIDERS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PROVIDERS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def create(self, request, *args, **kwargs):
        try:
            serializer = ProviderCreateUpdateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='provider',
                data=serializer.data,
                message='¡Proveedor creado con éxito!',
                detail_code='CREATE_PROVIDER_SUCCESS',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='CREATE_PROVIDER_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='CREATE_PROVIDER_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class ProviderDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin | IsEmployee]

    def get_queryset(self):
        return ProviderModel.objects.all()

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(ProviderModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = ProviderDetailSerializer(instance)
            return self.custom_response(
                data_key='provider',
                data=serializer.data,
                message='¡Proveedor encontrado con éxito!',
                detail_code='FETCH_PROVIDER_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='Usted no posee permiso para acceder a este recurso.',
                detail_code='FETCH_PROVIDER_PERMISSION_ERROR',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Proveedor no encontrado.',
                detail_code='FETCH_PROVIDER_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='FETCH_PROVIDER_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PROVIDER_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = ProviderCreateUpdateSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='provider',
                data=serializer.data,
                message='¡Proveedor actualizado con éxito!',
                detail_code='UPDATE_PROVIDER_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Proveedor no encontrado.',
                detail_code='UPDATE_PROVIDER_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='UPDATE_PROVIDER_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='UPDATE_PROVIDER_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return self.custom_response(
                data_key='provider',
                data=None,
                message='¡Proveedor eliminado con éxito!',
                detail_code='DELETE_PROVIDER_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Proveedor no encontrado.',
                detail_code='DELETE_PROVIDER_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='DELETE_PROVIDER_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
