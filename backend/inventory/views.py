from rest_framework import generics, status
from rest_framework.exceptions import ValidationError, NotFound
from django.core.exceptions import ObjectDoesNotExist
from .permissions import IsAdmin
from core.mixins import CustomResponseMixin
from .models import (
    WarehouseModel, LocationModel, CategoryModel,
    ProductModel, InventoryModel, InventoryTransactionModel
)
from .serializers import (
    WarehouseListSerializer, WarehouseDetailSerializer,
    LocationListSerializer, LocationDetailSerializer,
    CategoryListSerializer, CategoryDetailSerializer,
    ProductListSerializer, ProductDetailSerializer,
    InventoryListSerializer, InventoryDetailSerializer
)
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.http import Http404

# Create your views here.
class WarehouseListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return WarehouseModel.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = WarehouseListSerializer(page, many=True)
            return self.custom_paginated_response(
                data=serializer.data, 
                message='Fetched warehouses successfully!',
                paginator=self.paginator,
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
    
    def create(self, request, *args, **kwargs):
        serializer = WarehouseDetailSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Created warehouse successfully!',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error creating warehouse',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class WarehouseDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return WarehouseModel.objects.filter(is_active=True)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = WarehouseDetailSerializer(instance)
            return self.custom_response(
                data=serializer.data,
                message='Fetched warehouse successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Warehouse not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error fetching warehouse',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = WarehouseDetailSerializer(instance, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Updated warehouse successfully!',
                status_code=status.HTTP_200_OK
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error updating warehouse',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        get_object_or_404(WarehouseModel, pk=instance.pk)
        try: 
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data=None,
                message='Deleted warehouse successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
    
class LocationListView(generics.ListCreateAPIView):
    pass

class LocationDetailView(generics.RetrieveUpdateDestroyAPIView):
    pass

class ProductListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return ProductModel.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProductListSerializer(page, many=True)
            return self.custom_paginated_response(
                data=serializer.data, 
                message='Fetched products successfully!',
                paginator=self.paginator,
                status_code=status.HTTP_200_OK
            )

        serializer = ProductListSerializer(queryset, many=True)
        return self.custom_response(
            data=serializer.data, 
            message='Fetched products successfully!',
            status_code=status.HTTP_200_OK
        )
    
    def create(self, request, *args, **kwargs):
        serializer = ProductDetailSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Created product successfully!',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error creating product',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
        
class ProductDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return ProductModel.objects.filter(is_active=True)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = ProductDetailSerializer(instance)
            return self.custom_response(
                data=serializer.data,
                message='Fetched product successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Product not found. Please check the UUID.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error fetching product',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ProductDetailSerializer(instance, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Updated product successfully!',
                status_code=status.HTTP_200_OK
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error updating product',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def destroy(self, request, *args, **kwargs):
        try: 
            instance = self.get_object()
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data=None,
                message='Deleted product successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )