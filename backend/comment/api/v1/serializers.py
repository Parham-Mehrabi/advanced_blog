from rest_framework import serializers
from django.shortcuts import get_object_or_404
from comment.models import LikeDislike, Comment
from account.models import Profile


class ListCreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['author', 'article']


class LikeDislikeSerializer(serializers.ModelSerializer):
    """
        serializer which handles likes and dislikes
    """
    class Meta:
        model = LikeDislike
        fields = ['comment', 'vote']

    def validate(self, attrs):
        """
            prevent users to like or dislike their own comments
        """
        request = self.context.get('request')
        user = request.user.id
        author = attrs.get('comment').author.user.id
        if user == author:
            raise serializers.ValidationError({'error': 'you cant like or dislike your own comment'})
        return super().validate(attrs)

    def create(self, validated_data):
        """
            create a new LikeDislike object if needed and set proper vote on them
        """
        comment = validated_data['comment']
        user = self.context.get('request').user
        profile = get_object_or_404(Profile, user=user.id)
        vote = validated_data['vote']
        try:
            new_comment = LikeDislike.objects.get(comment=comment, profile=profile)
            new_comment.vote = vote
            new_comment.save()
        except LikeDislike.DoesNotExist:
            new_comment = LikeDislike.objects.create(comment=comment, profile=profile, vote=vote)
            new_comment.save()
        return new_comment
