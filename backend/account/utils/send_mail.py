from mail_templated import EmailMessage
from django.conf import settings
from celery import shared_task


@shared_task
def send_password_reset_token(email, user, token):
    """
    send {token} to {user}'s {email}
    """
    if settings.DEBUG:
        email_obj = EmailMessage(
            "email/password_reset.tpl",
            {"token": token},
            "parham-webdev@parham.com",
            to=[email],
        )
        email_obj.send()
    else:
        email_obj = EmailMessage(
            "email/password_reset.tpl",
            {"token": token,
             "user": user},
            'mail.parham-webdev.com',
            to=[email],
        )
        email_obj.send()


@shared_task
def send_email_verification(email, token):
    if settings.DEBUG:
        email_obj = EmailMessage(
            "email/verify_email.tpl",
            {"token": token},
            "parham-webdev@parham.com",
            to=[email],
        )
        email_obj.send()
    else:
        email_obj = EmailMessage(
            "email/verify_email.tpl",
            {"token": token},
            'mail.parham-webdev.com',
            to=[email],
        )
        email_obj.send()
