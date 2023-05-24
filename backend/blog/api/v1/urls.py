from rest_framework.routers import DefaultRouter
from blog.api.v1.views import BlogViewSet,CategoryApiView

app_name = 'api-v1'

router = DefaultRouter()
router.register(basename='blog', viewset=BlogViewSet, prefix='blog')
router.register(basename='category', viewset=CategoryApiView, prefix='category')

urlpatterns = [
]
urlpatterns += router.urls
