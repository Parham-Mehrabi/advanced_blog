import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


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
