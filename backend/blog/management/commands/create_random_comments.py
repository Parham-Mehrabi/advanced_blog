from django.core.management.base import BaseCommand
from faker import Faker
from comment.models import Comment
from account.models import Profile
from blog.models import Article


class Command(BaseCommand):
    """
        a costume command which create 5 random comment for each profile and each blog
    """

    help = 'write 5 command for profile user in each blog'

    def __init__(self, *args, **kwargs):
        self.faker = Faker()
        super().__init__(*args, **kwargs)

    def handle(self, *args, **options):
        profiles = Profile.objects.all()
        blogs = Article.objects.all()
        for profile in profiles:
            for blog in blogs:
                for _ in range(5):
                    comment = Comment.objects.create(author=profile,
                                                     article=blog,
                                                     title=self.faker.paragraph(nb_sentences=1),
                                                     comment=self.faker.paragraph(nb_sentences=5))
                    comment.save()
