from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS


class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        """
            grant permission if the method is safe or user is the owner
        """
        return bool(request.user == obj.author or request.method in SAFE_METHODS)


class IsVerifiedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        """
            grant permission if user is verified or readonly
        """
        return bool((request.user.is_authenticated and request.user.is_verified) or request.method in SAFE_METHODS)
