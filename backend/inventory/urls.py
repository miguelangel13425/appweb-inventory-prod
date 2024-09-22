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
    path('warehouses/<str:pk>/', WarehouseDetailView.as_view(), name='warehouse-detail'),

    path('warehouses/<str:fk>/locations/', LocationListView.as_view(), name='location-list'),
    path('locations/<str:pk>/', LocationDetailView.as_view(), name='location-detail'),

    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<str:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<str:pk>/', ProductDetailView.as_view(), name='product-detail'),

    path('inventories/', InventoryListView.as_view(), name='inventory-list'),
    path('inventories/<str:pk>/', InventoryDetailView.as_view(), name='inventory-detail'),

    path('inventories/<str:fk>/transactions/', InventoryTransactionListView.as_view(), name='inventory-transaction-list'),
    path('transactions/<str:pk>/', InventoryTransactionDetailView.as_view(), name='inventory-transaction-detail'),
]
