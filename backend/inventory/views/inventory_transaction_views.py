from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from inventory.permissions import (
    IsAdmin, IsEmployee, IsViewer
)
from core.mixins import CustomResponseMixin
from inventory.models import (
    InventoryTransactionModel
)
from inventory.serializers import (
    InventoryTransactionListSerializer, InventoryTransactionDetailSerializer,
    InventoryTransactionCreateUpdateSerializer
)
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.http import Http404
from django.db.models import Q

# Create your views here.
class InventoryTransactionListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin | IsEmployee | IsViewer]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = InventoryTransactionModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(person__first_name__icontains=search_term) | 
                Q(person__last_name__icontains=search_term) |
                Q(inventory__product__name__icontains=search_term) |
                Q(inventory__location__name__icontains=search_term) |
                Q(inventory__location__warehouse__name__icontains=search_term) |
                Q(type__icontains=search_term) |
                Q(movement__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = InventoryTransactionListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='inventory_transactions',
                data=serializer.data,
                message='¡Transacciones encontradas con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_INVENTORY_TRANSACTIONS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_INVENTORY_TRANSACTIONS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def create(self, request, *args, **kwargs):
        try:
            serializer = InventoryTransactionCreateUpdateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory_transaction',
                data=serializer.data,
                message='¡Transacción creada con éxito!',
                detail_code='CREATE_INVENTORY_TRANSACTION_SUCCESS',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='CREATE_INVENTORY_TRANSACTION_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='CREATE_INVENTORY_TRANSACTION_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class InventoryTransactionDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin | IsEmployee]

    def get_queryset(self):
        return InventoryTransactionModel.objects.all()

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(InventoryTransactionModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = InventoryTransactionDetailSerializer(instance)
            return self.custom_response(
                data_key='inventory_transaction',
                data=serializer.data,
                message='¡Transacción encontrada con éxito!',
                detail_code='FETCH_INVENTORY_TRANSACTION_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='Usted no posee permiso para acceder a este recurso.',
                detail_code='FETCH_INVENTORY_TRANSACTION_PERMISSION_ERROR',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Transacción no encontrada.',
                detail_code='FETCH_INVENTORY_TRANSACTION_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='FETCH_INVENTORY_TRANSACTION_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_INVENTORY_TRANSACTION_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(InventoryTransactionModel, pk=instance.pk)
            serializer = InventoryTransactionCreateUpdateSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory_transaction',
                data=serializer.data,
                message='¡Transacción actualizada con éxito!',
                detail_code='UPDATE_INVENTORY_TRANSACTION_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Transacción no encontrada.',
                detail_code='UPDATE_INVENTORY_TRANSACTION_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='UPDATE_INVENTORY_TRANSACTION_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='UPDATE_INVENTORY_TRANSACTION_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(InventoryTransactionModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='inventory_transaction',
                data=None,
                message='¡Transacción eliminada con éxito!',
                detail_code='DELETE_INVENTORY_TRANSACTION_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Transacción no encontrada.',
                detail_code='DELETE_INVENTORY_TRANSACTION_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='DELETE_INVENTORY_TRANSACTION_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
