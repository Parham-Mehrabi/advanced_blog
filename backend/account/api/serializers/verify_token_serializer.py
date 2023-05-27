import jwt
from rest_framework_simplejwt.serializers import TokenVerifySerializer
from django.conf import settings
from django.contrib.auth import get_user_model
from .token_obtain_serializer import LoginTokenSerializer

User = get_user_model()


class VerifyTokenSerializer(TokenVerifySerializer):
    """
        costume token verify serializer
    """

    def validate(self, attrs):
        """
            add a field that returns user
            using the same method in LoginTokenSerializer
        """
        response = super().validate(attrs)
        token = attrs['token']
        user_id = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')['user_id']
        user = User.objects.get(id=user_id)
        user_details = LoginTokenSerializer.get_user_details(attrs, user=user)
        response['user'] = user_details
        return response

