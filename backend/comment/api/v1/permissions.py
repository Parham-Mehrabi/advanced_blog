from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsVerifiedOrReadOnly(BasePermission):
    """
        grant access if user is verified or request method is in SAFE_METHOD
    """

    def has_permission(self, request, view):
        """ check if user is verified or method is safe """
        return bool((request.user.is_authenticated and request.user.is_verified) or (request.method in SAFE_METHODS))


class ReadOnly(BasePermission):
    """
        read only: returns true if method is safe
    """
    def has_permission(self, request, view):
        return bool(request.method in SAFE_METHODS)
