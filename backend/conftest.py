import random
import pytest

from rest_framework.test import APIClient
from faker import Faker
from django.contrib.auth import get_user_model
from account.models import Profile
from blog.models import Article, Category
from comment.models import Comment, LikeDislike

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
def verified_profile(verified_user):
    profile = Profile.objects.get(user=verified_user)
    return profile


@pytest.fixture
def comment0(verified_profile, random_blog):
    comment0 = Comment.objects.create(
        author=verified_profile,
        article=random_blog,
        title=fake.word(),
        comment=fake.paragraph()
    )
    return comment0


@pytest.fixture
def like_comment(verified_profile, comment0):
    like = LikeDislike.objects.create(comment=comment0,
                                      profile=verified_profile,
                                      vote=1)
    return like


@pytest.fixture
def random_blog(verified_profile, category0):
    blog = Article.objects.create(author=verified_profile, category=category0,
                                  title=fake.word, context=fake.paragraph(),
                                  status=random.choice([True, False]))
    return blog
