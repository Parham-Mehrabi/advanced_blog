from .send_mail import send_password_reset_token, send_email_verification


def get_token_for_user(user):
    from rest_framework_simplejwt.tokens import RefreshToken
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)
