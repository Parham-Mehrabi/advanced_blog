import pytest
from django.urls import reverse
from comment.models import Comment
from django.db import transaction

@pytest.mark.django_db
class TestGetCommentsResponses:
    """
        test get comments
    """

    def test_get_comments_list_not_valid_id_404(self, api_client):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': 0})
        response = api_client.get(url)
        assert response.status_code == 404

    def test_get_comments_list_unauthorized_401(self, api_client, random_blog):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': random_blog.id})
        response = api_client.get(url)
        assert response.status_code == 401

    def test_get_comments_authorized_verified_200(self, api_client, random_blog, user0):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': random_blog.id})
        api_client.force_authenticate(user0)
        response = api_client.get(url)
        assert response.status_code == 200

    def test_get_comments_authorized_unverified_200(self, api_client, random_blog, unverified_user):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': random_blog.id})
        api_client.force_authenticate(unverified_user)
        response = api_client.get(url)
        assert response.status_code == 200


@pytest.mark.django_db
class TestPostCommentsResponses:
    """
        test post comments
    """

    def test_post_new_comment_unauthorized_401(self, api_client, random_blog):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': random_blog.id})
        data = {
            'title': 'string',
            'comment': 'string'
        }
        response = api_client.post(url, data)
        assert response.status_code == 401

    def test_post_new_comment_unverified_403(self, api_client, random_blog, unverified_user):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': random_blog.id})
        api_client.force_authenticate(unverified_user)
        data = {
            'title': 'string',
            'comment': 'string'
        }
        response = api_client.post(url, data)
        assert response.status_code == 403

    def test_post_new_comment_verified_invalid_data_400(self, api_client, random_blog, verified_user):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': random_blog.id})
        api_client.force_authenticate(verified_user)
        data1 = {
            'comment': 'string'
        }
        data2 = {
            'title': 'string',
        }
        data3 = {}
        response1 = api_client.post(url, data1)
        response2 = api_client.post(url, data2)
        response3 = api_client.post(url, data3)
        assert response1.status_code == 400
        assert response2.status_code == 400
        assert response3.status_code == 400


    @transaction.atomic
    def test_post_new_comment_verified_valid_data_201(self, api_client, random_blog, verified_user):
        url = reverse('comment:api-v1:list_create_comments', kwargs={'pk': random_blog.id})
        api_client.force_authenticate(verified_user)
        data = {
            'title': 'title_verified_user_valid_data',
            'comment': 'comment_verified_user_valid_data'
        }
        response = api_client.post(url, data)
        assert response.status_code == 201
        try:
            Comment.objects.get(
                title="title_verified_user_valid_data",
                comment="comment_verified_user_valid_data",
            )
            assert True
        except Comment.DoesNotExist:
            assert False
