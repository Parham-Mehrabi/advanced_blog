from django.db import models
from account.models import Profile


class Comment(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL)

    title = models.CharField(max_length=250)
    comment = models.TextField(max_length=1024)

    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
