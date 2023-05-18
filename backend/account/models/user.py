from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
        User Manager which handle creating users
    """

    def create_user(self, email, password, **kwargs):
        """ handle creating users """

        if not email:
            raise ValueError(_('this field is required'))
        email = self.normalize_email(email)

        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **kwargs):

        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_active', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_verified', True)

        if kwargs.get('is_staff') is not True:
            raise ValueError(_('super user most have is_staff=True'))
        if kwargs.get('is_active') is not True:
            raise ValueError(_('super user most have is_active=True'))
        if kwargs.get('is_superuser') is not True:
            raise ValueError(_('super user most have is_superuser=True'))
        if kwargs.get('is_verified') is not True:
            raise ValueError(_('super user most have is_verified=True'))

        self.create_user(email, password, **kwargs)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
        custom user model
    """

    email = models.EmailField(max_length=256, unique=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=True)  # Todo: change default to false and verify using email
    is_active = models.BooleanField(default=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.email
