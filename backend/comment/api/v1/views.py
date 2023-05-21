import rest_framework.authentication
from rest_framework.generics import GenericAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import LikeDislikeSerializer
from comment.models import LikeDislike
from django.shortcuts import get_object_or_404


class LikeDislikeApiView(GenericAPIView):
    """
        handle likes
    """
    serializer_class = LikeDislikeSerializer
    permission_classes = [IsAuthenticated]

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

