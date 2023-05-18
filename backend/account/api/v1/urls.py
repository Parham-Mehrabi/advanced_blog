from django.urls import path
from .views import RegisterApi, LoginApi, VerifyTokenApi, ChangePasswordApiView

app_name = 'api-v1'

urlpatterns = [
    path('register/', RegisterApi.as_view(), name='register'),
    path('login/', LoginApi.as_view(), name='login'),
    path('token/verify/', VerifyTokenApi.as_view(), name='token_verify'),

    # password:
    path("password/change/", ChangePasswordApiView.as_view(), name="change_password"),
    # path("reset-password/", ResetPasswordApi.as_view(), name="reset_password"),
    # path("reset-password/confirm/<str:token>",ConfirmResetPasswordApi.as_view(),name="reset_password_confirm",),
]
