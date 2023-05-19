import rest_framework.authentication
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from blog.models import Article
from blog.permissions import IsAuthorOrReadOnly, IsVerifiedOrReadOnly
from blog.api.v1.serializers import BlogSerializer
from blog.api.v1.paginators import BlogPaginator


class BlogViewSet(ModelViewSet):
    model = Article
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly, IsVerifiedOrReadOnly]

    pagination_class = BlogPaginator
    authentication_classes = [rest_framework.authentication.BasicAuthentication]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    ordering = ["-last_update"]
    ordering_fields = ["is_complete", "created_date", 'last_update']

    search_fields = ["title", "context", "author__email", 'category']

    filterset_fields = {
        "context": ["in", "exact"],
        "author__email": ["exact", "in"],
        "created_date": ["lt", "gt"],
    }

    def get_queryset(self):
        return Article.objects.filter(status=True)
