from rest_framework import generics, status
from rest_framework.exceptions import ValidationError, NotFound
from django.core.exceptions import ObjectDoesNotExist
from accounts.models import StudentModel
from accounts.serializers import (
    StudentListSerializer, StudentDetailSerializer,
    StudentCreateUpdateSerializer,
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

class StudentListView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin | IsEmployee | IsViewer]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = StudentModel.objects.all()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(first_name__icontains=search_term) |
                Q(last_name__icontains=search_term) |
                Q(email__icontains=search_term) |
                Q(control_number__icontains=search_term) |
                Q(degree__icontains=search_term)
            )
        return queryset

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)
            serializer = StudentListSerializer(page, many=True)
            return self.custom_paginated_response(
                data_key='students',
                data=serializer.data,
                message='¡Estudiantes encontrados con éxito!',
                paginator=self.paginator,
                detail_code='FETCH_STUDENTS_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_STUDENTS_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def create(self, request, *args, **kwargs):
        try:
            serializer = StudentCreateUpdateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='student',
                data=serializer.data,
                message='¡Estudiante creado con éxito!',
                detail_code='CREATE_STUDENT_SUCCESS',
                status_code=status.HTTP_201_CREATED
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='CREATE_STUDENT_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='CREATE_STUDENT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

class StudentDetailView(CustomResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdmin | IsEmployee]

    def get_queryset(self):
        return StudentModel.objects.all()

    def get_object(self):
        pk = self.kwargs.get('pk')
        return get_object_or_404(StudentModel, pk=pk)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = StudentDetailSerializer(instance)
            return self.custom_response(
                data_key='student',
                data=serializer.data,
                message='¡Estudiante encontrado con éxito!',
                detail_code='FETCH_STUDENT_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except PermissionDenied:
            return self.custom_error(
                message='Usted no posee permiso para acceder a este recurso.',
                detail_code='FETCH_STUDENT_PERMISSION_ERROR',
                status_code=status.HTTP_403_FORBIDDEN
            )
        except Http404:
            return self.custom_error(
                message='Estudiante no encontrado.',
                detail_code='FETCH_STUDENT_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='FETCH_STUDENT_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_STUDENT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = StudentCreateUpdateSerializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.custom_response(
                data_key='student',
                data=serializer.data,
                message='¡Estudiante actualizado con éxito!',
                detail_code='UPDATE_STUDENT_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Estudiante no encontrado.',
                detail_code='UPDATE_STUDENT_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except ValidationError as ve:
            return self.custom_error(
                message='¡Hubo un error de validación!',
                detail_code='UPDATE_STUDENT_VALIDATION_ERROR',
                status_code=status.HTTP_400_BAD_REQUEST,
                errors=ve.detail
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='UPDATE_STUDENT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return self.custom_response(
                data_key='student',
                data=None,
                message='¡Estudiante eliminado con éxito!',
                detail_code='DELETE_STUDENT_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Http404:
            return self.custom_error(
                message='Estudiante no encontrado.',
                detail_code='DELETE_STUDENT_NOT_FOUND',
                status_code=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='DELETE_STUDENT_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
