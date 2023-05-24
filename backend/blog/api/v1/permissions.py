from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsStaffOrReadOnly(BasePermission):
    """
        grant access if user is staff or request method is in SAFE_METHOD
    """

    def has_permission(self, request, view):
        """ check if user is staff or method is safe """
        return bool((request.user.is_authenticated and request.user.is_staff) or request.method in SAFE_METHODS)
