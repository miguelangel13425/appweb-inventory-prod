from django.http import HttpResponseRedirect
from django.http import JsonResponse

def index(request, path=''):
    api_prefixes = ['api', 'admin', 'media']
    path_prefix = path.split('/')[0]

    if path_prefix in api_prefixes:
        return None
    
    return HttpResponseRedirect(f'http://127.0.0.1:5173/{path}')

def custom_404_view(request, exception=None):
    return JsonResponse({
        'message': 'Recurso no encontrado.',
        'errors': None
    }, status=404)