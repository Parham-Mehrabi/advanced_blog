from rest_framework import serializers
from blog.models import Article, Category
from account.models import Profile
from django.urls import reverse_lazy


class AuthorSerializer(serializers.ModelSerializer):
    """
        this serializer purpose is to represent email and is_superuser with id in BlogSerializer
    """

    email = serializers.CharField(source='user.email', read_only=True)
    is_superuser = serializers.BooleanField(source='user.is_superuser', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'email', 'is_superuser', 'first_name', 'last_name']


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
            max_length = 100
            if rep["context"] and len(rep["context"]) > max_length:
                context = rep.pop("context", None)
                truncated_context = context[:max_length].rsplit(' ', 1)[0] + " . . . "
                rep["context"] = truncated_context
            rep['category_name'] = Category.objects.get(id=rep['category']).__str__()
        return rep


class CategorySerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField(method_name='blog_count', read_only=True)
    absolute_url = serializers.SerializerMethodField(method_name='get_absolute_url', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'count', 'absolute_url']
        read_only_fields = ['count', 'absolute_url']

    def blog_count(self, obj):
        """ get count of blogs with this category """
        return Article.objects.filter(category=obj).count()

    def get_absolute_url(self, obj):
        """ create relative link for the object's details """
        request = self.context.get("request")
        return request.build_absolute_uri(obj.pk)


class CategoryDetailsSerializer(serializers.ModelSerializer):
    """
        CategoryDetailsSerializer is the same with CategorySerializer but this doesn't have the absolute url
        we could do this in to_representation just like BlogSerializer ! ! !
    """
    count = serializers.SerializerMethodField(method_name='blog_count', read_only=True)
    blogs_link = serializers.SerializerMethodField(method_name='get_blogs_link', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'count', 'blogs_link']
        read_only_fields = ['count', 'blogs_link']

    def blog_count(self, obj):
        """ get count of blogs with this category """
        return Article.objects.filter(category=obj, status=True).count()

    def get_blogs_link(self, obj):
        base_url = reverse_lazy('blog:api-v1:blog-list')
        search_params = f'?category={obj.pk}'
        return base_url + search_params
