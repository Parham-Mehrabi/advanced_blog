from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions


class ChangePasswordSerializer(serializers.Serializer):
    """ change the user's password """

    old_password = serializers.CharField(required=True, max_length=128)
    new_password = serializers.CharField(required=True, max_length=128)
    new_password1 = serializers.CharField(required=True, max_length=128)

    def validate(self, attrs):
        if attrs.get("new_password") != attrs.get("new_password1"):
            raise serializers.ValidationError({"detail": _("passwords doesnt match")})
        return super().validate(attrs)
