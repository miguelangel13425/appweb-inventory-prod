from django.contrib.auth.models import BaseUserManager
from rest_framework import serializers
from core.validations import (
    remove_spaces, validate_length, validate_no_start_num_or_special,
    validate_min_value, validate_max_value,
)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
        
class UserAPIManager(serializers.ModelSerializer):
    class Meta:
        abstract = True

    def validate_first_name(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 64)
        value = validate_no_start_num_or_special(value)
        return value
    
    def validate_last_name(self, value):
        value = remove_spaces(value)
        value = validate_length(value, 64)
        value = validate_no_start_num_or_special(value)
        return value
    
class ProfileManager(serializers.ModelSerializer):
    pass

class StudentManager(serializers.ModelSerializer):
    class Meta:
        abstract = True

class ProviderManager(serializers.ModelSerializer):
    class Meta:
        abstract = True