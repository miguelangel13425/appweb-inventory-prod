from django.db import models

class UnitChoices(models.TextChoices):
    GALLON = 'GAL', 'Galón'
    PIECE = 'PC', 'Pieza'
    BOX = 'BOX', 'Caja'
    METER = 'M', 'Metro'
    PACKAGE = 'PKG', 'Paquete'

class MovementChoices(models.TextChoices):
    IN = 'IN', 'Entrada'
    OUT = 'OUT', 'Salida'