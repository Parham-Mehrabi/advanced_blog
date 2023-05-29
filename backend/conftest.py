import random
import pytest

from rest_framework.test import APIClient
from faker import Faker
from django.contrib.auth import get_user_model
from account.models import Profile
from blog.models import Article, Category
User = get_user_model()
fake = Faker()


@pytest.fixture
def api_client():
    client = APIClient()
    return client


@pytest.fixture
def verified_user():
    verified_user = User.objects.create_user(
        email="verifieduser@parham.com", password="parham654321", is_verified=True
    )
    return verified_user


@pytest.fixture
def unverified_user():
    unverified_user = User.objects.create_user(
        email="unverifieduser@parham.com", password="parham654321", is_verified=False
    )
    return unverified_user


@pytest.fixture
def user0():
    user0 = User.objects.create_user(
        email="user0@parham.com", password="parham654321", is_verified=True
    )
    return user0


@pytest.fixture
def category0():
    category0 = Category.objects.create(title=fake.word())
    return category0


@pytest.fixture
def random_blog_id(user0, category0):
    profile = Profile.objects.create(user=user0)
    blog = Article.objects.create(author=profile, category=category0,
                                  title=fake.word, context=fake.paragraph(),
                                  status=random.choice([True, False]))
    return blog.id
