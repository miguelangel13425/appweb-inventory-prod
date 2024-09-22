from rest_framework import serializers
from .models import (
    WarehouseModel, LocationModel, CategoryModel,
    ProductModel, InventoryModel, InventoryTransactionModel,
)
from .managers import (
    WarehouseManager, LocationManager, CategoryManager,
    ProductManager, InventoryManager, InventoryTransactionManager
)

class WarehouseListSerializer(WarehouseManager):
    class Meta:
        model = WarehouseModel
        fields = ['id', 'name', 'description']

class WarehouseDetailSerializer(WarehouseManager):
    class Meta:
        model = WarehouseModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'deleted_at']

class LocationListSerializer(LocationManager):
    class Meta:
        model = LocationModel
        fields = ['id', 'name', 'description']

class LocationDetailSerializer(LocationManager):
    class Meta:
        model = LocationModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class CategoryListSerializer(CategoryManager):
    class Meta:
        model = CategoryModel
        fields = ['id', 'code', 'name', 'description']

class CategoryDetailSerializer(CategoryManager):
    class Meta:
        model = CategoryModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class ProductListSerializer(ProductManager):
    unit_display = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'description', 'unit_display', 'category']

    def get_unit_display(self, obj):
        return obj.get_unit_display()

class ProductDetailSerializer(ProductManager):
    class Meta:
        model = ProductModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class InventoryListSerializer(InventoryManager):
    class Meta:
        model = InventoryModel
        fields = ['id', 'product', 'location']

class InventoryDetailSerializer(InventoryManager):
    class Meta:
        model = InventoryModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class InventoryTransactionListSerializer(InventoryTransactionManager):
    movement_display = serializers.SerializerMethodField()

    class Meta:
        model = InventoryTransactionModel
        fields = ['id', 'product', 'location', 'quantity', 'movement_display'] 

    def get_movement_display(self, obj):
        return obj.get_movement_display()

class InventoryTransactionDetailSerializer(InventoryTransactionManager):
    class Meta:
        model = InventoryTransactionModel
        fields = '__all__'   
        read_only_fields = ['created_at', 'updated_at']
