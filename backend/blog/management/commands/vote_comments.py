import random
from django.core.management.base import BaseCommand
from comment.models import LikeDislike, Comment
from account.models import Profile


class Command(BaseCommand):
    """
        like or dislike comments randomly with all profiles
    """

    help = 'like or dislike comments randomly with all profiles'

    def handle(self, *args, **options):
        profiles = Profile.objects.all()
        comments = Comment.objects.all()
        for profile in profiles:
            for comment in comments:
                obj = LikeDislike.objects.create(
                    profile=profile,
                    comment=comment,
                    vote=random.randint(0, 1)
                )
                obj.save()
