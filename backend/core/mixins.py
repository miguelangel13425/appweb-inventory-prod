from rest_framework.response import Response
from rest_framework import status

class CustomResponseMixin:
    def custom_response(self, data=None, message='', meta=None, status_code=status.HTTP_200_OK):
        return Response({
            'message': message,
            'data': data,
            'meta': meta
        }, status=status_code)
    
    def custom_paginated_response(self, data=None, message='', paginator=None, status_code=status.HTTP_200_OK):
        return Response({
            'message': message,
            'data': data,
            'meta': {
                'current_page': paginator.page.number,
                'total_pages': paginator.page.paginator.num_pages,
                'total_items': paginator.page.paginator.count,
                'page_size': paginator.page.paginator.per_page,
            }
        }, status=status_code)
    
    def custom_error(self, message='', status_code=status.HTTP_400_BAD_REQUEST, errors=None):
        return Response({
            'message': message,
            'errors': errors,
        }, status=status_code)