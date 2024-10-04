from rest_framework.response import Response
from rest_framework import status

class CustomResponseMixin:
    def custom_response(self, data=None, data_key='data', message='', meta=None, detail_code=None, status_code=status.HTTP_200_OK):
        return Response({
            'message': message,
            data_key: data,
            'meta': meta,
            'detail_code': detail_code
        }, status=status_code)
    
    def custom_paginated_response(self, data=None, data_key='data', message='', paginator=None, detail_code=None, status_code=status.HTTP_200_OK):
        return Response({
            'message': message,
            data_key: data,
            'meta': {
                'current_page': paginator.page.number,
                'total_pages': paginator.page.paginator.num_pages,
                'total_items': paginator.page.paginator.count,
                'page_size': paginator.page.paginator.per_page,
            },
            'detail_code': detail_code
        }, status=status_code)
    
    def custom_error(self, message='', errors=None, detail_code=None, status_code=status.HTTP_400_BAD_REQUEST):
        return Response({
            'message': message,
            'errors': errors,
            'detail_code': detail_code
        }, status=status_code)