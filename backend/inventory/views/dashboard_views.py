from rest_framework import generics, status
from inventory.permissions import (
    IsAdmin, IsEmployee, IsViewer
)
from core.mixins import CustomResponseMixin
from inventory.serializers import (
    DashboardSummarySerializer
)

# Create your views here.
class DashboardSummaryView(CustomResponseMixin, generics.ListCreateAPIView):
    permission_classes = [IsAdmin | IsEmployee | IsViewer]

    def list(self, request, *args, **kwargs):
        try:
            dashboard_data = DashboardSummarySerializer.get_dashboard_data()
            serializer = DashboardSummarySerializer(dashboard_data)
            return self.custom_response(
                data_key='dashboard',
                data=serializer.data,
                message='¡Tablero encontrado con éxito!',
                detail_code='FETCH_DASHBOARD_SUCCESS',
                status_code=status.HTTP_200_OK
            )
        except Exception as e:
            return self.custom_error(
                message='Se ha producido un error inesperado. Póngase en contacto con el servicio de asistencia técnica.',
                detail_code='FETCH_DASHBOARD_ERROR',
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors=str(e)
            )
