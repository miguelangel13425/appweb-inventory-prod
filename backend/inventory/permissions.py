from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Custom permission to only allow users with the 'Administrator' role to access certain views.
    """

    def has_permission(self, request, view):
        user = request.user
        if user.is_anonymous:
            return False
        return any(role.name == 'Administrator' for role in user.role.all())
    
class IsEmployee(BasePermission):
    """
    Custom permission to only allow users with the 'Employee' role to access certain views.
    """

    def has_permission(self, request, view):
        user = request.user
        if user.is_anonymous:
            return False
        return any(role.name == 'Employee' for role in user.role.all())