from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from inventory.permissions import IsAdmin
from core.mixins import CustomResponseMixin
from inventory.models import (
    LocationModel,
)
from inventory.serializers import (
    LocationListSerializer, LocationDetailSerializer,
    LocationCreateSerializer,
)
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.http import Http404
from django.db.models import Q

# Create your views here.
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
                message='¡Ubicaciones encontradas con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_LOCATIONS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_LOCATIONS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def create(self, request, *args, **kwargs):
        try:
            serializer = LocationCreateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='location',
                data=serializer.data,
                message='¡Ubicación creada con éxito!',
                detail_code='CREATE_LOCATION_SUCCESS',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='CREATE_LOCATION_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='CREATE_LOCATION_ERROR',
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
                message='¡Ubicación encontrada con éxito!',
                detail_code='FETCH_LOCATION_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='Usted no posee permiso para acceder a este recurso.',
                detail_code='FETCH_LOCATION_PERMISSION_ERROR',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Ubicación no encontrada.',
                detail_code='FETCH_LOCATION_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='FETCH_LOCATION_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_LOCATION_ERROR',
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
                message='¡Ubicación actualizada con éxito!',
                detail_code='UPDATE_LOCATION_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Ubicación no encontrada.',
                detail_code='UPDATE_LOCATION_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='UPDATE_LOCATION_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='UPDATE_LOCATION_ERROR',
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
                message='¡Ubicación eliminada con éxito!',
                detail_code='DELETE_LOCATION_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Ubicación no encontrada.',
                detail_code='DELETE_LOCATION_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='DELETE_LOCATION_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
