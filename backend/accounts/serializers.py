from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import UserModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'profile']
        extra_kwargs = {'password': {'write_only': True}}