from django.db import models

class UnitChoices(models.TextChoices):
    GALLON = 'GAL', 'Galón'
    PIECE = 'PC', 'Pieza'
    BOX = 'BOX', 'Caja'
    METER = 'M', 'Metro'
    LITRE = 'L', 'Litro'
    KILO = 'KG', 'Kilogramo'
    PACKAGE = 'PKG', 'Paquete'

class AvailabilityChoices(models.TextChoices):
    OUT_OF_STOCK = 'OUT', 'Sin existencia'
    LOW = 'LOW', 'Baja'
    MEDIUM = 'MEDIUM', 'Media'
    HIGH = 'HIGH', 'Alta'

class MovementChoices(models.TextChoices):
    IN = 'IN', 'Entrada'
    OUT = 'OUT', 'Salida'

class TypeChoices(models.TextChoices):
    # IN
    PURCHASE = 'PURCHASE', 'Compra' 
    RETURN = 'RETURN', 'Devolución'
    # OUT
    SALE = 'SALE', 'Venta' 
    LOST = 'LOST', 'Perdido' 
    DAMAGED = 'DAMAGED', 'Dañado'
    LOAN = 'LOAN', 'Préstamo' 
    # BOTH
