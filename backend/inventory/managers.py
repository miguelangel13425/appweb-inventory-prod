from rest_framework import serializers
from core.validations import (
    remove_spaces, validate_length, validate_no_start_num_or_special,
    validate_min_value, validate_max_value,
)
from .models import (
    WarehouseModel, LocationModel, CategoryModel, 
    ProductModel, InventoryModel, InventoryTransactionModel
)

class WarehouseManager(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = WarehouseModel

    def validate_name(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 64)
        value = validate_no_start_num_or_special(value)
        return value

    def validate_description(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 128)
        value = validate_no_start_num_or_special(value)
        return value

class LocationManager(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = LocationModel

    def validate_name(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 64)
        value = validate_no_start_num_or_special(value)
        return value

    def validate_description(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 128)
        value = validate_no_start_num_or_special(value)
        return value
    
class CategoryManager(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = CategoryModel

    def validate_code(self, value):
        value = validate_min_value(value, 10000)
        value = validate_max_value(value, 30000)
        return value

    def validate_name(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 64)
        value = validate_no_start_num_or_special(value)
        return value

    def validate_description(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 128)
        value = validate_no_start_num_or_special(value)
        return value
    
class ProductManager(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = ProductModel

    def validate_name(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 64)
        value = validate_no_start_num_or_special(value)
        return value
    
    def validate_description(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 128)
        value = validate_no_start_num_or_special(value)
        return value
    
class InventoryManager(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = InventoryModel

    def validate_quantity(self, value):
        value = validate_min_value(value, 0)
        return value

class InventoryTransactionManager(serializers.ModelSerializer):
    class Meta:
        abstract = True
        model = InventoryTransactionModel

    def validate_quantity(self, value):
        value = validate_min_value(value, 0)
        return value