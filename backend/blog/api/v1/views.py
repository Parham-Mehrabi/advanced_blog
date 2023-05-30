import rest_framework.authentication
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from blog.models import Article, Category
from blog.permissions import IsAuthorOrReadOnly, IsVerifiedOrReadOnly
from blog.api.v1.serializers import BlogSerializer, CategorySerializer, CategoryDetailsSerializer
from blog.api.v1.paginators import BlogPaginator, CategoryPaginator
from blog.api.v1.permissions import IsStaffOrReadOnly


class BlogViewSet(ModelViewSet):
    """
        a set of views which handles Articles end points
    """
    model = Article
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly, IsVerifiedOrReadOnly]

    pagination_class = BlogPaginator
    authentication_classes = [rest_framework.authentication.BasicAuthentication]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    ordering = ["-last_update"]
    ordering_fields = ["is_complete", "created_date", 'last_update']

    search_fields = ["title", "context", 'author__user__email',
                     'author__first_name', 'author__last_name',
                     'category__title']

    filterset_fields = {
        "context": ["in", "exact"],
        "author": ["exact", "in"],
        "created_date": ["lt", "gt"],
        'category': ["exact"],
    }

    def get_queryset(self):
        return Article.objects.filter(status=True)


class CategoryApiView(ModelViewSet):
    """
        a set of views which handles Category end points
    """
    model = Category
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsStaffOrReadOnly]
    pagination_class = CategoryPaginator
    lookup_field = 'pk'

    def get_serializer_class(self):
        """
            instead of overriding to_representation like BlogSerializer, here we declare a new serializer for retrieving
        """
        if self.action == 'retrieve':
            return CategoryDetailsSerializer
        return self.serializer_class
