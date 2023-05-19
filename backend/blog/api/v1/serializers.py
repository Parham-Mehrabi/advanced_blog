from rest_framework import serializers
from blog.models import Article
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthorSerializer(serializers.ModelSerializer):
    """
        this serializer purpose is to represent email and is_superuser with id in BlogSerializer
    """

    class Meta:
        model = User
        fields = ['id', 'email', 'is_superuser']


class BlogSerializer(serializers.ModelSerializer):
    """
        serializer for blogs list and blogs details
    """
    blog_absolute_url = serializers.URLField(source='get_absolute_api_url', read_only=True)
    blog_relative_url = serializers.SerializerMethodField(method_name='get_relative_url', read_only=True)
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'author', 'category', 'title', 'context',
                  'image', 'status', 'created_date', 'last_update',
                  'blog_absolute_url', 'blog_relative_url']
        read_only_fields = ["author"]

    def get_relative_url(self, obj):
        """ create relative link for the object's details """
        request = self.context.get("request")
        return request.build_absolute_uri(obj.pk)

    def create(self, validated_data):
        """ automatically add author from request """
        validated_data["author"] = self.context.get("request").user
        return super().create(validated_data)

    def to_representation(self, instance):
        """ remove urls in blog details and context in blog list """
        request = self.context.get("request")
        rep = super().to_representation(instance)
        if request.parser_context.get("kwargs").get("pk"):
            rep.pop("blog_absolute_url", None)
            rep.pop("blog_relative_url", None)
        else:
            rep.pop("context", None)
        return rep
