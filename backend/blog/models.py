from django.db import models
from account.models import Profile
from django.utils.translation import gettext_lazy as _
from django.urls import reverse


class Article(models.Model):
    """
        blog article's model
    """
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)

    title = models.CharField(max_length=128, verbose_name=_("article's title"))
    context = models.TextField()
    image = models.ImageField(blank=True, null=True)
    status = models.BooleanField(default=False, verbose_name=_('is published'))

    created_date = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk}: {self.title}'

    def get_absolute_api_url(self):
        return reverse("blog:api-v1:blog-detail", kwargs={"pk": self.pk})


class Category(models.Model):
    """
        category model for blog's articles
    """
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.title
