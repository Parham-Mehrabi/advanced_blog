from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """
        a serializer responsible for register users through API
    """

    password1 = serializers.CharField(max_length=128, required=True, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password1']

    def validate(self, attrs):
        password = attrs.get('password')
        password1 = attrs.get('password1')
        user = User(email=attrs.get("email"), password=password)
        try:
            validate_password(password, user=user)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": e.messages})

        if password1 != password:
            raise serializers.ValidationError({'password1': _('passwords are not match')})

        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop('password1')
        return User.objects.create_user(**validated_data)
