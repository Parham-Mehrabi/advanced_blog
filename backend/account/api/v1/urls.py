from django.urls import path
from .views import (RegisterApi, LoginApi, VerifyTokenApi, ChangePasswordApiView,
                    ResetPasswordApi, ConfirmResetPasswordApi)

app_name = 'api-v1'

urlpatterns = [
    path('register/', RegisterApi.as_view(), name='register'),
    path('login/', LoginApi.as_view(), name='login'),
    path('token/verify/', VerifyTokenApi.as_view(), name='token_verify'),

    # password:
    path("password/change/", ChangePasswordApiView.as_view(), name="change_password"),
    path("password/reset/", ResetPasswordApi.as_view(), name="reset_password"),
    path("password/reset/confirm/<str:token>", ConfirmResetPasswordApi.as_view(), name="reset_password_confirm",),

    # account verify
    # path('verify/send/'),
    # path('verify/resend/'),
]

# TODO:
#   logout
#   email verify & email verify resend

