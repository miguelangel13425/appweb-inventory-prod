from django.db import models

class GenderChoices(models.TextChoices):
    MALE = 'M', 'Hombre'
    FEMALE = 'F', 'Mujer'
    OTHER = 'O', 'Otro'