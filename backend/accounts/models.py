from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager
from .choices import GenderChoices
from core.models import BaseModel
from datetime import date
import uuid

# Create your models here.

class RoleModel(BaseModel):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'

    def __str__(self):
        return self.name

class UserModel(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    role = models.ManyToManyField(RoleModel, related_name='users')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

class ProfileModel(BaseModel):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')
    gender = models.CharField(max_length=8, choices=GenderChoices.choices, default=GenderChoices.MALE)
    birthdate = models.DateField(null=True, blank=True)
    bio = models.TextField(max_length=128, null=True, blank=True)

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

    @property
    def age(self):
        if self.birthdate is None:
            return None
        today = date.today()
        age = today.year - self.birthdate.year - ((today.month, today.day) < (self.birthdate.month, self.birthdate.day))
        return age
    
    def __str__(self):
        return self.user.email