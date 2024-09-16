from django.urls import path
from .views import (
    WarehouseListView, WarehouseDetailView, 
    LocationListView, LocationDetailView,

    ProductListView, ProductDetailView
)

urlpatterns = [
    path('warehouses/', WarehouseListView.as_view(), name='warehouse-list'),
    path('warehouses/<str:pk>/', WarehouseDetailView.as_view(), name='warehouse-detail'),

    path('locations/', LocationListView.as_view(), name='location-list'),
    path('locations/<str:pk>/', LocationDetailView.as_view(), name='location-detail'),

    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<str:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
