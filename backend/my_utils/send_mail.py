import os
from mail_templated import EmailMessage


def send_password_reset_token(email, user, token):
    a = EmailMessage(
        "email/password_reset.tpl",
        {"token": token,
         "user": user},
        os.getenv('SMTP_USERNAME'),
        to=[email],
    )
    a.send()
# TODO: handle it using celery
