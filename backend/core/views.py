from django.http import JsonResponse

def custom_404_view(request, exception=None):
    return JsonResponse({
        'message': 'Resource not found.',
        'errors': None
    }, status=404)