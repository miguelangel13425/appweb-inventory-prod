from rest_framework import serializers
from .models import (
    WarehouseModel, LocationModel, CategoryModel,
    ProductModel, InventoryModel, InventoryTransactionModel,
)
from .managers import (
    WarehouseManager, LocationManager, CategoryManager,
    ProductManager, InventoryManager, InventoryTransactionManager
)
from accounts.serializers import (
    PersonCustomSerializer,
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

class WarehouseCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseModel
        fields = ['id', 'name']

class WarehouseListSerializer(WarehouseManager):
    class Meta:
        model = WarehouseModel
        fields = ['id', 'name', 'description']

class WarehouseDetailSerializer(WarehouseManager, DateFormatManager):
    class Meta:
        model = WarehouseModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'deleted_at']

class LocationCustomSerializer(serializers.ModelSerializer):
    warehouse = WarehouseCustomSerializer()

    class Meta:
        model = LocationModel
        fields = ['id', 'name', 'warehouse']

class LocationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationModel
        fields = ['name', 'description', 'warehouse']

class LocationListSerializer(LocationManager):
    warehouse = WarehouseCustomSerializer()
    
    class Meta:
        model = LocationModel
        fields = ['id', 'name', 'description', 'warehouse']

class LocationDetailSerializer(LocationManager):
    class Meta:
        model = LocationModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class CategoryCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ['id', 'code', 'name']

class CategoryListSerializer(CategoryManager):
    class Meta:
        model = CategoryModel
        fields = ['id', 'code', 'name', 'description']

class CategoryDetailSerializer(CategoryManager, DateFormatManager):
    class Meta:
        model = CategoryModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class ProductCustomSerializer(serializers.ModelSerializer):
    unit_display = serializers.SerializerMethodField()
    category = CategoryCustomSerializer()

    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'unit_display', 'category']

    def get_unit_display(self, obj):
        return obj.get_unit_display()

class ProductListSerializer(ProductManager):
    unit_display = serializers.SerializerMethodField()
    category = CategoryCustomSerializer()
    
    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'description', 'is_single_use', 'unit_display', 'category']

    def get_unit_display(self, obj):
        return obj.get_unit_display()

class ProductDetailSerializer(ProductManager):
    class Meta:
        model = ProductModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class InventoryCustomSerializer(serializers.ModelSerializer):
    product = ProductCustomSerializer()
    location = LocationCustomSerializer()

    class Meta:
        model = InventoryModel
        fields = ['id', 'product', 'location']

class InventoryListSerializer(InventoryManager):
    product = ProductCustomSerializer()
    location = LocationCustomSerializer()
    availability_display = serializers.SerializerMethodField()

    class Meta:
        model = InventoryModel
        fields = ['id', 'product', 'location', 'quantity', 'availability_display']

    def get_availability_display(self, obj):
        return obj.get_availability_display()


class InventoryDetailSerializer(InventoryManager):
    class Meta:
        model = InventoryModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class InventoryTransactionListSerializer(InventoryTransactionManager, DateFormatManager):
    movement_display = serializers.SerializerMethodField()
    type_display = serializers.SerializerMethodField()
    inventory = InventoryCustomSerializer()
    person = PersonCustomSerializer()

    class Meta:
        model = InventoryTransactionModel
        fields = ['id', 'person', 'inventory', 'quantity', 'movement_display', 'type_display', 'inventory', 'created_at']
        read_only_fields = ['created_at'] 

    def get_movement_display(self, obj):
        return obj.get_movement_display()

    def get_type_display(self, obj):
        return obj.get_type_display()

class InventoryTransactionDetailSerializer(InventoryTransactionManager):
    class Meta:
        model = InventoryTransactionModel
        fields = '__all__'   
        read_only_fields = ['created_at', 'updated_at']
