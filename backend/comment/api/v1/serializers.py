from rest_framework import serializers
from django.shortcuts import get_object_or_404
from comment.models import LikeDislike, Comment
from account.models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()


class ListCreateCommentSerializer(serializers.ModelSerializer):
    """
        serializer for Create new Comment
    """
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['author', 'article']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        request = self.context['request']
        if request.method == 'GET':
            votes = LikeDislike.objects.filter(comment=rep['id'])
            rep['likes'] = votes.filter(vote=1).count()
            rep['dislikes'] = votes.filter(vote=0).count()
            if request.user and request.user.is_authenticated:
                if len(votes.filter(profile__user=request.user)):
                    rep['status'] = votes.filter(profile__user=request.user)[0].vote
                else:
                    rep['status'] = None
            else:
                rep['status'] = None
            try:
                rep['author_email'] = User.objects.get(id=rep['author']).__str__()
            except User.DoesNotExist:
                rep['author_email'] = 'deleted user'

        return rep


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
        # request = self.context.get('request')
        # user = request.user.id
        # author = attrs.get('comment').author.user.id
        # if user == author:
        #     raise serializers.ValidationError({'error': 'you cant like or dislike your own comment'})
        # LET THE USER LIKE OR DISLIKE HIS OWN COMMENT FOR NOW (just like instagram)
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

            if new_comment.vote == vote:
                """ check if user is removing its vote"""
                new_comment.delete()
                status = None

            else:
                """ check if user is changing its vote """
                new_comment.vote = vote
                new_comment.save()
                status = vote
        except LikeDislike.DoesNotExist:
            """ check if user is voting for the first time on this comment """
            new_comment = LikeDislike.objects.create(comment=comment, profile=profile, vote=vote)
            status = vote
            new_comment.save()
        return {'comment': new_comment, 'status': status}

    def to_representation(self, instance):
        votes = LikeDislike.objects.filter(comment=instance['comment'].comment.id)
        data = {
            'id': instance['comment'].id,
            'likes': votes.filter(vote=1).count(),
            'dislikes': votes.filter(vote=0).count(),
            'status': instance['status']
        }
        return data
