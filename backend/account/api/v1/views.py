from rest_framework.generics import GenericAPIView
from ..serializers import RegisterSerializer, ChangePasswordSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import status
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
User = get_user_model()


class RegisterApi(GenericAPIView):
    """
        create new users
    """
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "email": serializer.data["email"],
            "message": "user created successfully",
            "verify": "activation email has been sent",
        }
        return Response(data)


class LoginApi(TokenObtainPairView):
    """
        get email and password and return pair tokens
    """
    pass


class VerifyTokenApi(TokenVerifyView):
    """
        verify if the token is valid
    """
    pass


class ChangePasswordApiView(GenericAPIView):
    """ change a user's password """

    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    model = User

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        old_password = serializer.data.get('old_password')
        new_password = serializer.data.get("new_password")
        user = self.request.user
        if user.check_password(old_password):
            try:
                validate_password(new_password, user=user)
                user.set_password(new_password)
                user.save()
                return Response({"details": "password changed successfully"}, status=status.HTTP_200_OK)

            except exceptions.ValidationError as e:
                return Response({"new_password": list(e.messages)})
        else:
            return Response(
                {"old_password": "wrong_password"},
                status=status.HTTP_400_BAD_REQUEST,
            )








