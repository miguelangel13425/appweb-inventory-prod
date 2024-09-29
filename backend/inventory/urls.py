from django.urls import path
from .views import (
    WarehouseListView, WarehouseDetailView, 
    LocationListView, LocationDetailView,
    CategoryListView, CategoryDetailView,
    ProductListView, ProductDetailView,
    InventoryListView, InventoryDetailView,
    InventoryTransactionListView, InventoryTransactionDetailView
)

urlpatterns = [
    path('warehouses/', WarehouseListView.as_view(), name='warehouse-list'),
    path('warehouses/<uuid:pk>/', WarehouseDetailView.as_view(), name='warehouse-detail'),

    path('warehouses/<uuid:fk>/locations/', LocationListView.as_view(), name='location-list'),
    path('locations/<uuid:pk>/', LocationDetailView.as_view(), name='location-detail'),

    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<uuid:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<uuid:pk>/', ProductDetailView.as_view(), name='product-detail'),

    path('inventories/', InventoryListView.as_view(), name='inventory-list'),
    path('inventories/<uuid:pk>/', InventoryDetailView.as_view(), name='inventory-detail'),

    path('inventories/<uuid:fk>/transactions/', InventoryTransactionListView.as_view(), name='inventory-transaction-list'),
    path('transactions/<uuid:pk>/', InventoryTransactionDetailView.as_view(), name='inventory-transaction-detail'),
]