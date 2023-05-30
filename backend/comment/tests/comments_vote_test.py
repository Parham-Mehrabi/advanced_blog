import pytest
from django.urls import reverse


@pytest.mark.django_db
class TestGetVotes:
    """
        a viewer should be able to get comments' votes even if they are not authorized
    """

    def test_comments_vote_unauthorized(self, api_client, comment0, like_comment):
        url = reverse('comment:api-v1:list_like_dislike', kwargs={'pk': comment0.id})
        response = api_client.get(url)
        assert response.status_code == 200
        assert b'"status":null' in response.content
        assert b'like' in response.content
        assert b'dislike' in response.content

    def test_comment_vote_authorized_200(self, api_client, comment0, like_comment, user0):
        url = reverse('comment:api-v1:list_like_dislike', kwargs={'pk': comment0.id})
        api_client.force_authenticate(user0)
        response = api_client.get(url)
        assert response.status_code == 200
        assert b'"status":null' in response.content
        assert b'like' in response.content
        assert b'dislike' in response.content

    def test_comment_vote_authorized_liked_200(self, api_client, comment0, like_comment, verified_user):
        url = reverse('comment:api-v1:list_like_dislike', kwargs={'pk': comment0.id})
        api_client.force_authenticate(verified_user)
        response = api_client.get(url)
        assert response.status_code == 200
        assert b'"status":1' in response.content
        assert b'like' in response.content
        assert b'dislike' in response.content

    def test_comment_vote_authorized_not_safe_method_liked_403(self, api_client, comment0, like_comment, verified_user):
        url = reverse('comment:api-v1:list_like_dislike', kwargs={'pk': comment0.id})
        api_client.force_authenticate(verified_user)
        request_post = api_client.post(url)
        request_put = api_client.put(url)
        request_patch = api_client.patch(url)
        request_delete = api_client.delete(url)
        assert request_post.status_code == 403
        assert request_put.status_code == 403
        assert request_patch.status_code == 403
        assert request_delete.status_code == 403

    def test_comment_vote_unauthorized_not_safe_method_liked_401(self, api_client, comment0, like_comment):
        url = reverse('comment:api-v1:list_like_dislike', kwargs={'pk': comment0.id})
        request_post = api_client.post(url)
        request_put = api_client.put(url)
        request_patch = api_client.patch(url)
        request_delete = api_client.delete(url)
        assert request_post.status_code == 401
        assert request_put.status_code == 401
        assert request_patch.status_code == 401
        assert request_delete.status_code == 401
