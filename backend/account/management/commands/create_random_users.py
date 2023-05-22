from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError


User = get_user_model()


class Command(BaseCommand):
    """
        a costume command which create 5 random users
    """

    help = 'create 5 new users'

    def __init__(self, *args, **kwargs):
        self.faker = Faker()
        super().__init__(*args, **kwargs)

    def handle(self, *args, **options):
        for _ in range(5):
            email = self.faker.email()
            while True:
                try:
                    User.objects.create_user(email=email, password='faker654321')
                    break
                except IntegrityError:
                    print(f'user with email {email} already exists')
                    email = self.faker.email()
                    print(f'trying new email: {email}')
