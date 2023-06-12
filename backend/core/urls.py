from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .index import index
from django.conf.urls.static import static
from django.conf import settings

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    # admin :
    path('admin/', admin.site.urls),

    # SPA :
    re_path(r'^(?!(?:back|swagger|redoc|admin)(?:|$)).*', index, name='index'),

    # api end points:
    path('back/account/', include('account.urls', namespace='account'), name='account'),
    path('back/blog/', include('blog.urls', namespace='blog'), name='blog'),
    path('back/comment/', include('comment.urls', namespace='comment'), name='comment'),

    # docs:
    path('swagger/schema.yml', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
