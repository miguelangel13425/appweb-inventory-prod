from django.db import models
from .choices import UnitChoices, MovementChoices
from core.models import BaseModel

# Create your models here.

class WarehouseModel(BaseModel):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Warehouse'
        verbose_name_plural = 'Warehouses'

    def __str__(self):
        return self.name
    
class LocationModel(BaseModel):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)
    warehouse = models.ForeignKey(WarehouseModel, on_delete=models.CASCADE, related_name='locations')

    class Meta:
        verbose_name = 'Location'
        verbose_name_plural = 'Locations'

    def __str__(self):
        return self.name
    
class CategoryModel(BaseModel):
    code = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

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
    quantity = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Inventory'
        verbose_name_plural = 'Inventories'
        unique_together = ('product', 'location')

    def __str__(self):
        return f"{self.product.name} - {self.location.name}: {self.quantity}"

class InventoryTransactionModel(BaseModel):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, related_name='inventory_transactions')
    location = models.ForeignKey(LocationModel, on_delete=models.CASCADE, related_name='inventory_transactions')
    quantity = models.PositiveIntegerField(default=0)
    movement = models.CharField(max_length=8, choices=MovementChoices.choices, default=MovementChoices.IN)

    class Meta:
        verbose_name = 'Inventory Transaction'
        verbose_name_plural = 'Inventory Transactions'

    def __str__(self):
        return f"{self.movement} - {self.product.name} - {self.location.name}: {self.quantity}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_inventory()

    def update_inventory(self):
        inventory, created = InventoryModel.objects.get_or_create(product=self.product, location=self.location)
        if self.movement == MovementChoices.IN:
            inventory.quantity += self.quantity
        elif self.movement == MovementChoices.OUT:
            inventory.quantity -= self.quantity
            if inventory.quantity < 0:
                inventory.quantity = 0
        inventory.save()