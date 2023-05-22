import random
from django.core.management.base import BaseCommand
from faker import Faker
from blog.models import Article
from account.models import Profile
from blog.models import Category


class Command(BaseCommand):
    """
        create 3 blogs for each profile
    """

    help = 'create 3 random blogs for each profile object in database'

    def __init__(self, *args, **kwargs):
        self.faker = Faker()
        super().__init__(*args, **kwargs)

    def handle(self, *args, **options):
        profiles = Profile.objects.all()
        category = Category.objects.all()
        for profile in profiles:
            for _ in range(3):
                Article.objects.create(author=profile,
                                       category=random.choice(category),
                                       title=self.faker.paragraph(nb_sentences=1),
                                       context=self.faker.paragraph(nb_sentences=20),
                                       # TODO: add a default image for faker created objects
                                       status=random.choice([True, False]),
                                       )
