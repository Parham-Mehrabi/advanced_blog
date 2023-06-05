from celery import shared_task
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
from mail_templated import EmailMessage

User = get_user_model()


@shared_task
def purge_users():
    """
        delete the users which didn't verify their account in 2 days
    """
    unverified_users = User.objects.filter(is_verified=False)
    for user in unverified_users:
        if (user.created + timedelta(days=2)) < timezone.now():
            user.delete()
    return 'purge un verified users'


@shared_task
def send_useless_email():
    """
        send a useless email to inactive user just to use beat in django-celery-beat instead of settings.py
    """
    unverified_users = User.objects.filter(is_active=False)
    for user in unverified_users:
        if settings.DEBUG:
            email = EmailMessage(
                "email/useless_email.tpl",
                {},
                "parham-webdev@parham.com",
                to=[user.email],
            )
            email.send()
        else:
            email = EmailMessage(
                "email/useless_email.tpl",
                {},
                settings.EMAIL_HOST_USER,
                to=[user.email],
            )
            email.send()
    return 'send useless emails to in active users'
