from django.urls import path
from .views.warehouse_views import WarehouseListView, WarehouseDetailView, WarehouseCustomView
from .views.location_views import LocationListView, LocationDetailView, LocationCustomView
from .views.category_views import CategoryListView, CategoryDetailView, CategoryCustomView
from .views.product_views import ProductListView, ProductDetailView, ProductCustomView
from .views.inventory_views import InventoryListView, InventoryDetailView, InventoryCustomView
from .views.inventory_transaction_views import InventoryTransactionListView, InventoryTransactionDetailView
from .views.dashboard_views import DashboardSummaryView

urlpatterns = [
    path('warehouses/', WarehouseListView.as_view(), name='warehouse-list'),
    path('warehouses/<uuid:pk>/', WarehouseDetailView.as_view(), name='warehouse-detail'),
    path('warehouses/options/', WarehouseCustomView.as_view(), name='warehouse-options'),

    path('locations/', LocationListView.as_view(), name='location-list'),
    path('locations/<uuid:pk>/', LocationDetailView.as_view(), name='location-detail'),
    path('locations/options/', LocationCustomView.as_view(), name='location-options'),

    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<uuid:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('categories/options/', CategoryCustomView.as_view(), name='category-options'),

    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<uuid:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/options/', ProductCustomView.as_view(), name='product-options'),

    path('inventories/', InventoryListView.as_view(), name='inventory-list'),
    path('inventories/<uuid:pk>/', InventoryDetailView.as_view(), name='inventory-detail'),
    path('inventories/options/', InventoryCustomView.as_view(), name='inventory-options'),

    path('transactions/', InventoryTransactionListView.as_view(), name='inventory-transaction-list'),
    path('transactions/<uuid:pk>/', InventoryTransactionDetailView.as_view(), name='inventory-transaction-detail'),

    path('dashboard/', DashboardSummaryView.as_view(), name='dashboard-list'),
]