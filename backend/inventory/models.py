from django.db import models
from .choices import (
    UnitChoices, MovementChoices, AvailabilityChoices,
    TypeChoices
)
from core.models import BaseModel
from accounts.models import PersonModel

# Create your models here.

class WarehouseModel(BaseModel):
    name = models.CharField(max_length=64, unique=True, verbose_name='nombre')
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Campus'
        verbose_name_plural = 'Campus'
        ordering = ['created_at']

    def __str__(self):
        return self.name
    
class LocationModel(BaseModel):
    name = models.CharField(max_length=64, unique=True, verbose_name='nombre')
    description = models.TextField(max_length=128, null=True, blank=True)
    warehouse = models.ForeignKey(WarehouseModel, on_delete=models.CASCADE, related_name='locations')

    class Meta:
        verbose_name = 'Ubicación'
        verbose_name_plural = 'Ubicaciones'
        ordering = ['created_at']

    def __str__(self):
        return self.name
    
class CategoryModel(BaseModel):
    code = models.PositiveIntegerField(unique=True, verbose_name='código')
    name = models.CharField(max_length=64, unique=True, verbose_name='nombre')
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Partida'
        verbose_name_plural = 'Partidas'
        ordering = ['created_at']

    def __str__(self):
        return f'{self.code} - {self.name}'
    
class ProductModel(BaseModel):
    name = models.CharField(max_length=64, unique=True, verbose_name='nombre')
    description = models.TextField(max_length=128, null=True, blank=True)
    unit = models.CharField(max_length=8, choices=UnitChoices.choices, default=UnitChoices.PIECE)
    category = models.ForeignKey(CategoryModel, on_delete=models.CASCADE, related_name='products')
    is_single_use = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['created_at']

    def __str__(self):
        return self.name
    
class InventoryModel(BaseModel):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, related_name='inventories', verbose_name='producto')
    location = models.ForeignKey(LocationModel, on_delete=models.CASCADE, related_name='inventories', verbose_name='ubicación')

    class Meta:
        verbose_name = 'Inventario'
        verbose_name_plural = 'Inventarios'
        unique_together = ('product', 'location')

    def __str__(self):
        return f"{self.product.name} - {self.location.name}"

    @property
    def quantity(self):
        movements_in = self.inventory_movements.filter(movement=MovementChoices.IN).aggregate(total=models.Sum('quantity'))['total'] or 0
        movements_out = self.inventory_movements.filter(movement=MovementChoices.OUT).aggregate(total=models.Sum('quantity'))['total'] or 0
        return movements_in - movements_out
    
    @property
    def availability(self):
        quantity = self.quantity
        if quantity == 0:
            return AvailabilityChoices.OUT_OF_STOCK
        elif quantity > 0 and quantity <= 10:
            return AvailabilityChoices.LOW
        elif quantity > 10 and quantity <= 50:
            return AvailabilityChoices.MEDIUM
        else:
            return AvailabilityChoices.HIGH
    
    def get_availability_display(self):
        return dict(AvailabilityChoices.choices)[self.availability]


class InventoryTransactionModel(BaseModel):
    inventory = models.ForeignKey(InventoryModel, on_delete=models.CASCADE, related_name='inventory_movements')
    person = models.ForeignKey(PersonModel, null=True, blank=True, on_delete=models.CASCADE, related_name='inventory_movements')
    quantity = models.PositiveIntegerField(default=0)
    movement = models.CharField(max_length=8, choices=MovementChoices.choices, default=MovementChoices.IN)
    type = models.CharField(max_length=8, choices=TypeChoices.choices, default=TypeChoices.LOAN)
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Transacción'
        verbose_name_plural = 'Transacciones'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.movement} - {self.type} - {self.inventory.product.name} - {self.inventory.location.name}: {self.quantity}"