import rest_framework.authentication
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from blog.models import Article
from blog.permissions import IsAuthorOrReadOnly
from blog.api.v1.serializers import BlogSerializer


class BlogViewSet(ModelViewSet):
    model = Article
    serializer_class = BlogSerializer
    authentication_classes = [rest_framework.authentication.BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def get_queryset(self):
        return Article.objects.filter(status=True)
