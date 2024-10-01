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
from rest_framework.exceptions import PermissionDenied
from django.http import Http404
from django.db.models import Q

# Create your views here.
class WarehouseListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = WarehouseModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(Q(name__icontains=search_term))
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = WarehouseListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='warehouses',
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
        try:
            serializer = WarehouseListSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='warehouse',
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
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(WarehouseModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = WarehouseDetailSerializer(instance)
            return self.custom_response(
                data_key='warehouse',
                data=serializer.data,
                message='Fetched warehouse successfully!',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='You do not have permission to perform this action.',
                status_code=status.HTTP_403_FORBIDDEN
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
        try:
            instance = self.get_object()
            get_object_or_404(WarehouseModel, pk=instance.pk)
            serializer = WarehouseDetailSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='warehouse',
                data=serializer.data,
                message='Updated warehouse successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Warehouse not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
        try: 
            instance = self.get_object()
            get_object_or_404(WarehouseModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='warehouse',
                data=None,
                message='Deleted warehouse successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return self.custom_error(
                message='Warehouse not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
        queryset = LocationModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(warehouse__name__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = LocationListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='locations',
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
        try:
            serializer = LocationListSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='location',
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
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(LocationModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = LocationDetailSerializer(instance)
            return self.custom_response(
                data_key='location',
                data=serializer.data,
                message='Fetched location successfully!',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='You do not have permission to perform this action.',
                status_code=status.HTTP_403_FORBIDDEN
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
        try:
            instance = self.get_object()
            get_object_or_404(LocationModel, pk=instance.pk)
            serializer = LocationDetailSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='location',
                data=serializer.data,
                message='Updated location successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Location not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
            get_object_or_404(LocationModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='location',
                data=None,
                message='Deleted location successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return self.custom_error(
                message='Location not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class CategoryListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = CategoryModel.objects.filter(is_active=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(code__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = CategoryListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='categories',
                data=serializer.data, 
                message='Fetched categories successfully!',
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
        try:
            serializer = CategoryListSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='category',
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

class CategoryDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return CategoryModel.objects.filter(is_active=True)
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(CategoryModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = CategoryDetailSerializer(instance)
            return self.custom_response(
                data_key='category',
                data=serializer.data,
                message='Fetched category successfully!',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='You do not have permission to perform this action.',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Category not found.',
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
        try:
            instance = self.get_object()
            get_object_or_404(CategoryModel, pk=instance.pk)
            serializer = CategoryDetailSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='category',
                data=serializer.data,
                message='Updated category successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Category not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
            get_object_or_404(CategoryModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='category',
                data=None,
                message='Deleted category successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return self.custom_error(
                message='Category not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
            serializer = ProductListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='products',
                data=serializer.data, 
                message='Fetched products successfully!',
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
        try:
            serializer = ProductListSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='product',
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
                message='Fetched product successfully!',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='You do not have permission to perform this action.',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Product not found.',
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
        try:
            instance = self.get_object()
            get_object_or_404(ProductModel, pk=instance.pk)
            serializer = ProductDetailSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='product',
                data=serializer.data,
                message='Updated product successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Product not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
            get_object_or_404(ProductModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='product',
                data=None,
                message='Deleted product successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return self.custom_error(
                message='Product not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class InventoryListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin]
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
                message='Fetched inventories successfully!',
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
        try:
            serializer = InventoryListSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory',
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

class InventoryDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin]

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
                message='Fetched inventory successfully!',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='You do not have permission to perform this action.',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Inventory not found.',
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

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            get_object_or_404(InventoryModel, pk=instance.pk)
            serializer = InventoryDetailSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory',
                data=serializer.data,
                message='Updated inventory successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Inventory not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='Error updating inventory',
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
            get_object_or_404(InventoryModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='inventory',
                data=None,
                message='Deleted inventory successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return self.custom_error(
                message='Inventory not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
        queryset = InventoryTransactionModel.objects.all()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(Q(description__icontains=search_term))
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = InventoryTransactionListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='inventory_transactions',
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
        try:
            serializer = InventoryTransactionListSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory_transaction',
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
                message='Fetched inventory transaction successfully!',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='You do not have permission to perform this action.',
                status_code=status.HTTP_403_FORBIDDEN
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
        try:
            instance = self.get_object()
            get_object_or_404(InventoryTransactionModel, pk=instance.pk)
            serializer = InventoryTransactionDetailSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='inventory_transaction',
                data=serializer.data,
                message='Updated inventory transaction successfully!',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Inventory transaction not found.',
                status_code=status.HTTP_404_NOT_FOUND
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
            get_object_or_404(InventoryTransactionModel, pk=instance.pk)
            instance.is_active = False
            instance.save()
            return self.custom_response(
                data_key='inventory_transaction',
                data=None,
                message='Deleted inventory transaction successfully!',
                status_code=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return self.custom_error(
                message='Inventory transaction not found.',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='An unexpected error occurred. Please contact support.',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
