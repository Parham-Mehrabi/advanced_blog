from rest_framework.routers import DefaultRouter
from blog.api.v1.views import BlogViewSet

app_name = 'api-v1'

router = DefaultRouter()
router.register(basename='blog', viewset=BlogViewSet, prefix='blog')

urlpatterns = [
]
urlpatterns += router.urls
