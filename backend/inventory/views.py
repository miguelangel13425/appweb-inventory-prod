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
    InventoryListSerializer, InventoryDetailSerializer,
    InventoryTransactionListSerializer, InventoryTransactionDetailSerializer
)
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.http import Http404

# Create your views here.
class WarehouseListView(CustomResponseMixin, generics.ListCreateAPIView):
    #permission_classes = [IsAdmin]
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
    
class LocationListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        warehouse_id = self.kwargs.get('fk')
        return LocationModel.objects.filter(warehouse_id=warehouse_id, is_active=True)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = LocationListSerializer(page, many=True)
            return self.custom_paginated_response(
                data=serializer.data, 
                message='Fetched locations successfully!',
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
        serializer = LocationDetailSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Created location successfully!',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error creating location',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class LocationDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return LocationModel.objects.filter(is_active=True)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = LocationDetailSerializer(instance)
            return self.custom_response(
                data=serializer.data,
                message='Fetched location successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Location not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error fetching location',
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
        serializer = LocationDetailSerializer(instance, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Updated location successfully!',
                status_code=status.HTTP_200_OK
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error updating location',
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
                message='Deleted location successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )


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
        
class CategoryListView(generics.ListCreateAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return CategoryModel.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = CategoryListSerializer(queryset, many=True)
        return self.custom_response(
            data=serializer.data, 
            message='Fetched categories successfully!',
            status_code=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        serializer = CategoryDetailSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Created category successfully!',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error creating category',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
        
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return CategoryModel.objects.filter(is_active=True)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = CategoryDetailSerializer(instance)
            return self.custom_response(
                data=serializer.data,
                message='Fetched category successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Category not found. Please check the UUID.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error fetching category',
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
        serializer = CategoryDetailSerializer(instance, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Updated category successfully!',
                status_code=status.HTTP_200_OK
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error updating category',
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
                message='Deleted category successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
        

class InventoryListView(generics.ListCreateAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return InventoryModel.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = InventoryListSerializer(queryset, many=True)
        return self.custom_response(
            data=serializer.data, 
            message='Fetched inventories successfully!',
            status_code=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        serializer = InventoryDetailSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Created inventory successfully!',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error creating inventory',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
        
class InventoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return InventoryModel.objects.filter(is_active=True)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = InventoryDetailSerializer(instance)
            return self.custom_response(
                data=serializer.data,
                message='Fetched inventory successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Inventory not found. Please check the UUID.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error fetching inventory',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
        
class InventoryTransactionListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        inventory_id = self.kwargs.get('fk')
        return InventoryTransactionModel.objects.filter(inventory_id=inventory_id, is_active=True)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = InventoryTransactionListSerializer(page, many=True)
            return self.custom_paginated_response(
                data=serializer.data, 
                message='Fetched inventory transactions successfully!',
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
        serializer = InventoryTransactionDetailSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Created inventory transaction successfully!',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error creating inventory transaction',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class InventoryTransactionDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return InventoryTransactionModel.objects.filter(is_active=True)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = InventoryTransactionDetailSerializer(instance)
            return self.custom_response(
                data=serializer.data,
                message='Fetched inventory transaction successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Inventory transaction not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error fetching inventory transaction',
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
        serializer = InventoryTransactionDetailSerializer(instance, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data=serializer.data,
                message='Updated inventory transaction successfully!',
                status_code=status.HTTP_200_OK
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error updating inventory transaction',
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
                message='Deleted inventory transaction successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
