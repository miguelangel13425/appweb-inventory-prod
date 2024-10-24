from rest_framework import serializers
from .models import (
    WarehouseModel, LocationModel, CategoryModel,
    ProductModel, InventoryModel, InventoryTransactionModel,
)
from core.managers import DateFormatManager
from .managers import (
    WarehouseManager, LocationManager, CategoryManager,
    ProductManager, InventoryManager, InventoryTransactionManager
)
from accounts.serializers import (
    PersonCustomSerializer,
)

# Warehouse's serializers

class WarehouseCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseModel
        fields = ['id', 'name']

class WarehouseCreateUpdateSerializer(WarehouseManager):
    class Meta:
        model = WarehouseModel
        fields = ['name', 'description']

class WarehouseListSerializer(WarehouseManager):
    class Meta:
        model = WarehouseModel
        fields = ['id', 'name', 'description']

class WarehouseDetailSerializer(WarehouseManager, DateFormatManager):
    class Meta:
        model = WarehouseModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'deleted_at']

# Location's serializers

class LocationCustomSerializer(serializers.ModelSerializer):
    warehouse = WarehouseCustomSerializer()

    class Meta:
        model = LocationModel
        fields = ['id', 'name', 'warehouse']

class LocationCreateUpdateSerializer(LocationManager):
    class Meta:
        model = LocationModel
        fields = ['name', 'description', 'warehouse']

class LocationListSerializer(LocationManager):
    warehouse = WarehouseCustomSerializer()
    
    class Meta:
        model = LocationModel
        fields = ['id', 'name', 'description', 'warehouse']

class LocationDetailSerializer(LocationManager, DateFormatManager):
    warehouse = WarehouseCustomSerializer()

    class Meta:
        model = LocationModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

# Category's serializers

class CategoryCustomSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ['id', 'code', 'name']

class CategoryCreateUpdateSerializer(CategoryManager):
    class Meta:
        model = CategoryModel
        fields = ['code', 'name', 'description']

class CategoryListSerializer(CategoryManager):
    class Meta:
        model = CategoryModel
        fields = ['id', 'code', 'name', 'description']

class CategoryDetailSerializer(CategoryManager, DateFormatManager):
    class Meta:
        model = CategoryModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

# Product's serializers

class ProductCustomSerializer(serializers.ModelSerializer):
    unit_display = serializers.SerializerMethodField()
    category = CategoryCustomSerializer()

    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'unit_display', 'category']

    def get_unit_display(self, obj):
        return obj.get_unit_display()

class ProductCreateUpdateSerializer(ProductManager):
    class Meta:
        model = ProductModel
        fields = ['name', 'description', 'unit', 'is_single_use', 'category']

class ProductListSerializer(ProductManager):
    unit_display = serializers.SerializerMethodField()
    category = CategoryCustomSerializer()
    
    class Meta:
        model = ProductModel
        fields = ['id', 'name', 'description', 'is_single_use', 'unit_display', 'category']

    def get_unit_display(self, obj):
        return obj.get_unit_display()

class ProductDetailSerializer(ProductManager, DateFormatManager):
    unit_display = serializers.SerializerMethodField()
    category = CategoryCustomSerializer()

    class Meta:
        model = ProductModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def get_unit_display(self, obj):
        return obj.get_unit_display()

# Inventory's serializers

class InventoryCustomSerializer(serializers.ModelSerializer):
    product = ProductCustomSerializer()
    location = LocationCustomSerializer()

    class Meta:
        model = InventoryModel
        fields = ['id', 'product', 'location']

class InventoryCreateUpdateSerializer(InventoryManager):
    class Meta:
        model = InventoryModel
        fields = ['product', 'location']

class InventoryListSerializer(InventoryManager):
    product = ProductCustomSerializer()
    location = LocationCustomSerializer()
    availability_display = serializers.SerializerMethodField()

    class Meta:
        model = InventoryModel
        fields = ['id', 'product', 'location', 'quantity', 'availability_display']

    def get_availability_display(self, obj):
        return obj.get_availability_display()

class InventoryDetailSerializer(InventoryManager, DateFormatManager):
    product = ProductCustomSerializer()
    location = LocationCustomSerializer()
    availability_display = serializers.SerializerMethodField()

    class Meta:
        model = InventoryModel
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def get_availability_display(self, obj):
        return obj.get_availability_display()

# Inventory Transaction's serializers

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
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        created_at = instance.created_at
        if created_at:
            # Formatear la fecha en el formato "Día mes año"
            representation['created_at'] = created_at.strftime('%d %B %Y')
        return representation
    
class InventoryTransactionCreateUpdateSerializer(InventoryTransactionManager):
    class Meta:
        model = InventoryTransactionModel
        fields = ['person', 'inventory', 'quantity', 'movement', 'type', 'description']

class InventoryTransactionDetailSerializer(InventoryTransactionManager, DateFormatManager):
    movement_display = serializers.SerializerMethodField()
    type_display = serializers.SerializerMethodField()
    inventory = InventoryCustomSerializer()
    person = PersonCustomSerializer()

    class Meta:
        model = InventoryTransactionModel
        fields = '__all__'   
        read_only_fields = ['created_at', 'updated_at']

    def get_movement_display(self, obj):
        return obj.get_movement_display()

    def get_type_display(self, obj):
        return obj.get_type_display()
