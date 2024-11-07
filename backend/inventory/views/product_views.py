from rest_framework import generics, status
from rest_framework.exceptions import ValidationError, NotFound
from django.core.exceptions import ObjectDoesNotExist
from inventory.permissions import (
    IsAdmin, IsEmployee, IsViewer
)
from core.mixins import CustomResponseMixin
from inventory.models import (
    WarehouseModel, LocationModel, CategoryModel,
    ProductModel, InventoryModel, InventoryTransactionModel
)
from inventory.serializers import (
    ProductListSerializer, ProductDetailSerializer,
    ProductCustomSerializer, ProductCreateUpdateSerializer,
)
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.http import Http404
from django.db.models import Q
from core.pagination import SmallPageNumberPagination

# Create your views here.
class ProductCustomView(CustomResponseMixin, generics.ListAPIView):
    permission_classes = [ IsAdmin | IsEmployee ]
    pagination_class = SmallPageNumberPagination

    def get_queryset(self):
        queryset = ProductModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(category__name__icontains=search_term) |
                Q(category__code__icontains=search_term) |
                Q(unit__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = ProductCustomSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='products',
                data=serializer.data,
                message='¡Productos encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_PRODUCTS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PRODUCTS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class ProductListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin | IsEmployee | IsViewer]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = ProductModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        is_single_use = self.request.query_params.get('is_single_use', None)
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(category__name__icontains=search_term) |
                Q(category__code__icontains=search_term) |
                Q(unit__icontains=search_term)
            )
        if is_single_use is not None:
            if is_single_use.lower() == 'true':
                queryset = queryset.filter(is_single_use=True)
            elif is_single_use.lower() == 'false':
                queryset = queryset.filter(is_single_use=False)
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = ProductListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='products',
                data=serializer.data,
                message='¡Productos encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_PRODUCTS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PRODUCTS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def create(self, request, *args, **kwargs):
        try:
            serializer = ProductCreateUpdateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='product',
                data=serializer.data,
                message='¡Producto creado con éxito!',
                detail_code='CREATE_PRODUCT_SUCCESS',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='CREATE_PRODUCT_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='CREATE_PRODUCT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )


class ProductDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin | IsEmployee]

    def get_queryset(self):
        return ProductModel.objects.filter(is_active=True)

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(ProductModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = ProductDetailSerializer(instance)
            return self.custom_response(
                data_key='product',
                data=serializer.data,
                message='¡Producto encontrado con éxito!',
                detail_code='FETCH_PRODUCT_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='Usted no posee permiso para acceder a este recurso.',
                detail_code='FETCH_PRODUCT_PERMISSION_ERROR',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Producto no encontrado.',
                detail_code='FETCH_PRODUCT_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='FETCH_PRODUCT_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_PRODUCT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(ProductModel, pk=instance.pk)
            serializer = ProductCreateUpdateSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='product',
                data=serializer.data,
                message='¡Producto actualizado con éxito!',
                detail_code='UPDATE_PRODUCT_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Producto no encontrado.',
                detail_code='UPDATE_PRODUCT_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='UPDATE_PRODUCT_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='UPDATE_PRODUCT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(ProductModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='product',
                data=None,
                message='¡Producto eliminado con éxito!',
                detail_code='DELETE_PRODUCT_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Producto no encontrado.',
                detail_code='DELETE_PRODUCT_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='DELETE_PRODUCT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
