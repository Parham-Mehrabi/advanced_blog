from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
User = get_user_model()


class ChangePasswordSerializer(serializers.Serializer):
    """ change the user's password """

    old_password = serializers.CharField(required=True, max_length=128)
    new_password = serializers.CharField(required=True, max_length=128)
    new_password1 = serializers.CharField(required=True, max_length=128)

    def validate(self, attrs):
        if attrs.get("new_password") != attrs.get("new_password1"):
            raise serializers.ValidationError({"detail": _("passwords doesnt match")})
        return super().validate(attrs)


class ResetPasswordSerializer(serializers.Serializer):
    """
        check if the email exist and create a jwt token for user
    """

    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        email = attrs.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"details": "user does not exist"})
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        attrs["token"] = token
        attrs["user"] = user
        return super().validate(attrs)


class ConfirmResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(max_length=128, required=True)
    new_password1 = serializers.CharField(max_length=128, required=True)

    def validate(self, attrs):
        password = attrs.get("new_password")
        if password != attrs.get("new_password1"):
            raise serializers.ValidationError({"detail": "passwords doesnt match"})
        try:
            validate_password(
                password=attrs.get("new_password"), user=self.context.get("user")
            )
            # user passed to validation to check its similarity with email address
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"new_password": list(e.messages)})
        return super().validate(attrs)
