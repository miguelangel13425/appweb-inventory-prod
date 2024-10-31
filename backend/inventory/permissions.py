from rest_framework.permissions import BasePermission
from accounts.choices import RoleChoices

class IsAdmin(BasePermission):
    """
    Custom permission to only allow users with the 'Administrator' role to access certain views.
    """

    def has_permission(self, request, view):
        user = request.user
        if user.is_anonymous:
            return False
        return user.role == RoleChoices.ADMIN
    
class IsEmployee(BasePermission):
    """
    Custom permission to only allow users with the 'Employee' role to access certain views.
    """

    def has_permission(self, request, view):
        user = request.user
        if user.is_anonymous:
            return False
        return user.role == RoleChoices.EMPLOYEE
    
class IsViewer(BasePermission):
    """
    Custom permission to only allow users with the 'Viewer' role to access certain views.
    """

    def has_permission(self, request, view):
        user = request.user
        if user.is_anonymous:
            return False
        return user.role == RoleChoices.VIEWER