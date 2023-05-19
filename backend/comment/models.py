from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _


User = get_user_model()


class Article(models.Model):
    """
        blog article's model
    """
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL)

    title = models.CharField(max_length=128, verbose_name=_("article's title"))
    context = models.TextField()
    image = models.ImageField(blank=True, Null=True)
    status = models.BooleanField(default=False, verbose_name=_('is published'))

    created_date = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Category(models.Model):
    """
        category model for blog's articles
    """
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.title
