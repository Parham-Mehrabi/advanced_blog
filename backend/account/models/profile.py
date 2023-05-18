from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Profile(models.Model):
    """
        profile for users
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=128, blank=True)
    last_name = models.CharField(max_length=128, blank=True)

    description = models.CharField(max_length=128, blank=True)
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.user.email
