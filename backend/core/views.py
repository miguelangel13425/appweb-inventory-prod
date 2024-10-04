from django.http import JsonResponse

def custom_404_view(request, exception=None):
    return JsonResponse({
        'message': 'Recurso no encontrado.',
        'errors': None
    }, status=404)