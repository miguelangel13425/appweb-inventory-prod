from django.db import models

class UnitChoices(models.TextChoices):
    GALLON = 'GAL', 'Galón'
    PIECE = 'PC', 'Pieza'
    BOX = 'BOX', 'Caja'
    METER = 'M', 'Metro'
    PACKAGE = 'PKG', 'Paquete'

class AvailabilityChoices(models.TextChoices):
    OUT_OF_STOCK = 'OUT', 'Sin existencia'
    LOW = 'LOW', 'Baja'
    MEDIUM = 'MEDIUM', 'Media'
    HIGH = 'HIGH', 'Alta'

class MovementChoices(models.TextChoices):
    IN = 'IN', 'Entrada'
    OUT = 'OUT', 'Salida'