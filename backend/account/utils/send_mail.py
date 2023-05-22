from mail_templated import EmailMessage
from django.conf import settings


def send_password_reset_token(email, user, token):
    """
    send {token} to {user}'s {email}
    :param email:
    :param user:
    :param token:
    :return:
    """
    if settings.DEBUG:
        email = EmailMessage(
            "email/password_reset.tpl",
            {"token": token},
            "parham-webdev@parham.com",
            to=[email],
        )
        email.send()
    else:
        email = EmailMessage(
            "email/password_reset.tpl",
            {"token": token,
             "user": user},
            settings.EMAIL_HOST_USER,
            to=[email],
        )
        email.send()


def send_email_verification(email, token):
    if settings.DEBUG:
        email = EmailMessage(
            "email/verify_email.tpl",
            {"token": token},
            "parham-webdev@parham.com",
            to=[email],
        )
        email.send()
    else:
        email = EmailMessage(
            "email/verify_email.tpl",
            {"token": token},
            settings.EMAIL_HOST_USER,
            to=[email],
        )
        email.send()


# TODO: handle it using celery
