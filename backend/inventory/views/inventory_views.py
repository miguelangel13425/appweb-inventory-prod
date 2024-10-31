from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from inventory.permissions import (
    IsAdmin, IsEmployee, IsViewer
)
from core.mixins import CustomResponseMixin
from inventory.models import (
    InventoryModel, 
)
from inventory.serializers import (
    InventoryListSerializer, InventoryDetailSerializer,
    InventoryCreateUpdateSerializer
)
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.http import Http404
from django.db.models import Q

# Create your views here.
class InventoryListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin | IsEmployee | IsViewer]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = InventoryModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(product__name__icontains=search_term) |
                Q(location__name__icontains=search_term) |
                Q(location__warehouse__name__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = InventoryListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='inventories',
                data=serializer.data,
                message='¡Inventarios encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_INVENTORIES_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_INVENTORIES_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def create(self, request, *args, **kwargs):
        try:
            serializer = InventoryCreateUpdateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory',
                data=serializer.data,
                message='¡Inventario creado con éxito!',
                detail_code='CREATE_INVENTORY_SUCCESS',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='CREATE_INVENTORY_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='CREATE_INVENTORY_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class InventoryDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin | IsEmployee]

    def get_queryset(self):
        return InventoryModel.objects.filter(is_active=True)

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(InventoryModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = InventoryDetailSerializer(instance)
            return self.custom_response(
                data_key='inventory',
                data=serializer.data,
                message='¡Inventario encontrado con éxito!',
                detail_code='FETCH_INVENTORY_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='Usted no posee permiso para acceder a este recurso.',
                detail_code='FETCH_INVENTORY_PERMISSION_ERROR',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Inventario no encontrado.',
                detail_code='FETCH_INVENTORY_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='FETCH_INVENTORY_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_INVENTORY_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(InventoryModel, pk=instance.pk)
            serializer = InventoryCreateUpdateSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory',
                data=serializer.data,
                message='¡Inventario actualizado con éxito!',
                detail_code='UPDATE_INVENTORY_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Inventario no encontrado.',
                detail_code='UPDATE_INVENTORY_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='UPDATE_INVENTORY_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='UPDATE_INVENTORY_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(InventoryModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='inventory',
                data=None,
                message='¡Inventario eliminado con éxito!',
                detail_code='DELETE_INVENTORY_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Inventario no encontrado.',
                detail_code='DELETE_INVENTORY_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='DELETE_INVENTORY_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
