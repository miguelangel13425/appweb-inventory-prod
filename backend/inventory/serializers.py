from rest_framework import serializers
from .models import (
    WarehouseModel, LocationModel, CategoryModel,
    ProductModel, InventoryModel, InventoryTransactionModel,
)
from .managers import (
    WarehouseManager, LocationManager, CategoryManager,
    ProductManager, InventoryManager, InventoryTransactionManager
)

class DateFormatManager(serializers.ModelSerializer):
    def format_date(self, date):
        if date:
            return date.strftime('%Y-%m-%d %H:%M')
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for field in self.Meta.read_only_fields:
            if field in representation and isinstance(representation[field], str) and 'T' in representation[field]:
                formatted_date = self.format_date(getattr(instance, field))
                if formatted_date:
                    representation[field] = formatted_date
        return representation

class WarehouseListSerializer(WarehouseManager):
    class Meta:
        model = WarehouseModel
        fields = ['id', 'name', 'description']

class WarehouseDetailSerializer(WarehouseManager, DateFormatManager):
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
