from django.db import models
from account.models import Profile
from blog.models import Article


class Comment(models.Model):
    """
        article's comments model
    """
    author = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    comment = models.TextField(max_length=1024)     # TODO: rename this field to body

    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.author}: {self.article}'


class LikeDislike(models.Model):

    """
        Comment's likes and dislike model
    """
    LikeOrDislike = {
        (0, 'Dislike'),
        (1, 'Like'),
    }
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    vote = models.SmallIntegerField(choices=LikeOrDislike)

    def __str__(self):
        if self.vote:
            return f'{self.id}-{self.profile}: liked {self.comment.title}'
        return f'{self.id}-{self.profile}: disliked {self.comment.title}'
