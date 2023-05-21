from django.urls import path
from .views import LikeDislikeApiView, DislikeApiView, ListCreateCommentApi
app_name = 'api-v1'


urlpatterns = [
    path('comment/<int:pk>', ListCreateCommentApi.as_view()),

    # comment's likes and dislikes
    path('vote/add/', LikeDislikeApiView.as_view(), name='add_like_dislike'),
    path('vote/<int:pk>/remove/', DislikeApiView.as_view(), name='remove_like_dislike')
]
