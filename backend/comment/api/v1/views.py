import rest_framework.authentication
from rest_framework.generics import GenericAPIView, DestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import IsVerifiedOrReadOnly
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import LikeDislikeSerializer, ListCreateCommentSerializer
from comment.models import LikeDislike, Comment
from account.models import Profile


class ListCreateCommentApi(ListCreateAPIView):
    """
        list comments and let user create new comment if authenticated and verified
    """
    serializer_class = ListCreateCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsVerifiedOrReadOnly]
    authentication_classes = [rest_framework.authentication.BasicAuthentication]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        queryset = Comment.objects.filter(article=pk)
        return queryset

    def perform_create(self, serializer):
        pk = self.kwargs.get('pk')
        profile = Profile.objects.get(user_id=self.request.user.id)
        comment = serializer.validated_data.get('comment')
        title = serializer.validated_data.get('title')
        obj = Comment.objects.create(author=profile, article_id=pk,
                                     title=title,
                                     comment=comment)
        obj.save()


class LikeDislikeApiView(GenericAPIView):
    """
        handle likes
    """
    serializer_class = LikeDislikeSerializer
    permission_classes = [IsAuthenticated, IsVerifiedOrReadOnly]

    def post(self, request, *args, **kwargs):
        serializer = LikeDislikeSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'details': 'success'}, status=status.HTTP_200_OK)


class DislikeApiView(DestroyAPIView):
    """
        remove user's like or dislike on a post
    """
    permission_classes = [IsAuthenticated]

    def get_object(self):
        pk = self.kwargs['pk']
        obj = get_object_or_404(LikeDislike, profile__user=self.request.user, pk=pk)
        return obj
