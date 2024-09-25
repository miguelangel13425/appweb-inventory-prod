from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import UserModel, RoleModel

class RoleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleModel
        fields = ['id', 'name']

class UserCreateSerializer(UserCreateSerializer):
    role = serializers.SerializerMethodField()
    
    class Meta(UserCreateSerializer.Meta):
        model = UserModel
        fields = ('id', 'email', 'first_name', 'last_name', 'role', 'password')
    
    def get_role(self, obj):
        roles = obj.role.all()
        return RoleDetailSerializer(roles, many=True).data

class UserListSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    
    class Meta:
        model = UserModel
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'role']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_role(self, obj):
        roles = obj.role.all()
        return RoleDetailSerializer(roles, many=True).data
    
class UserDetailSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        exclude = ['password']
        read_only_fields = ['created_at', 'updated_at']
    
    def get_role(self, obj):
        roles = obj.role.all()
        return RoleDetailSerializer(roles, many=True).data