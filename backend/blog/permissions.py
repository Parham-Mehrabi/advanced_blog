from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS


class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        """
            grant permission if the method is safe or user is the owner
        """
        return bool(request.user == obj.author or request.method in SAFE_METHODS)
