import jwt
from rest_framework.generics import GenericAPIView
from ..serializers import (RegisterSerializer, ChangePasswordSerializer,
                           ResetPasswordSerializer, ConfirmResetPasswordSerializer)
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import status
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.conf import settings
from django.shortcuts import get_object_or_404
from my_utils.send_mail import send_password_reset_token as send_rtoken
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


class ResetPasswordApi(GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        token = serializer.validated_data["token"]
        user = serializer.validated_data["user"]
        send_rtoken(email=email, user=user, token=token)
        return Response({"success": "password rest link has been sent to your email"})



class ConfirmResetPasswordApi(GenericAPIView):
    """
       check the reset password token and set a new password
       """

    serializer_class = ConfirmResetPasswordSerializer

    def get(self, request, *args, **kwargs):
        return Response(
            {"details": "send new password via post request"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def post(self, request, token, *args, **kwargs):
        try:
            token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.exceptions.InvalidSignatureError:
            return Response({"details": "invalid token"})
        except jwt.exceptions.ExpiredSignatureError:
            return Response({"details": "token expired"})
        except jwt.DecodeError:
            return Response({"details": "invalid token"})
        except Exception as e:
            return Response(str(e))
        user = get_object_or_404(User, id=token.get("user_id"))
        serializer = ConfirmResetPasswordSerializer(
            data=request.data, context={"user": user}
        )
        # user sent to serializer for password validation
        serializer.is_valid(raise_exception=True)
        user.set_password(serializer.data.get("new_password"))
        user.save()
        return Response(
            {"details": "new password set to user successfully."},
            status=status.HTTP_200_OK,
        )
