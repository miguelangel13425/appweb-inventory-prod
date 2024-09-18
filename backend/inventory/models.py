from django.db import models
from .choices import UnitChoices, MovementChoices
from core.models import BaseModel
from accounts.models import PersonModel

# Create your models here.

class WarehouseModel(BaseModel):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Warehouse'
        verbose_name_plural = 'Warehouses'
        ordering = ['created_at']

    def __str__(self):
        return self.name
    
class LocationModel(BaseModel):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)
    warehouse = models.ForeignKey(WarehouseModel, on_delete=models.CASCADE, related_name='locations')

    class Meta:
        verbose_name = 'Location'
        verbose_name_plural = 'Locations'
        ordering = ['created_at']

    def __str__(self):
        return self.name
    
class CategoryModel(BaseModel):
    code = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['created_at']

    def __str__(self):
        return f'{self.code} - {self.name}'
    
class ProductModel(BaseModel):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)
    unit = models.CharField(max_length=8, choices=UnitChoices.choices, default=UnitChoices.PIECE)
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, related_name='products')

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['created_at']

    def __str__(self):
        return self.name
    
class InventoryModel(BaseModel):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, related_name='inventories')
    location = models.ForeignKey(LocationModel, on_delete=models.CASCADE, related_name='inventories')

    class Meta:
        verbose_name = 'Inventory'
        verbose_name_plural = 'Inventories'
        unique_together = ('product', 'location')

    def __str__(self):
        return f"{self.product.name} - {self.location.name}"

    @property
    def quantity(self):
        movements_in = self.inventory_movements.filter(movement=MovementChoices.IN).aggregate(total=models.Sum('quantity'))['total'] or 0
        movements_out = self.inventory_movements.filter(movement=MovementChoices.OUT).aggregate(total=models.Sum('quantity'))['total'] or 0
        return movements_in - movements_out


class InventoryTransactionModel(BaseModel):
    inventory = models.ForeignKey(InventoryModel, on_delete=models.CASCADE, related_name='inventory_movements')
    person = models.ForeignKey(PersonModel, null=True, blank=True, on_delete=models.CASCADE, related_name='inventory_movements')
    quantity = models.PositiveIntegerField(default=0)
    movement = models.CharField(max_length=8, choices=MovementChoices.choices, default=MovementChoices.IN)

    class Meta:
        verbose_name = 'Inventory Transaction'
        verbose_name_plural = 'Inventory Transactions'
        ordering = ['created_at']

    def __str__(self):
        return f"{self.movement} - {self.inventory.product.name} - {self.inventory.location.name}: {self.quantity}"

    def save(self, *args, **kwargs):
        if self.movement == MovementChoices.OUT:
            if self.inventory.quantity < self.quantity:
                raise ValueError("Insufficient inventory")
        super().save(*args, **kwargs)
