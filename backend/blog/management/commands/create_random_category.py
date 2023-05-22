from django.core.management.base import BaseCommand
from faker import Faker
from blog.models import Category


class Command(BaseCommand):
    """
        create 10 random categories
    """

    help = 'create 10 random categories'

    def __init__(self, *args, **kwargs):
        self.faker = Faker()
        super().__init__(*args, **kwargs)

    def handle(self, *args, **options):
        for _ in range(10):
            Category.objects.create(title=self.faker.paragraph(nb_sentences=1))
