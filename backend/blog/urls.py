from django.urls import path, include

app_name = 'blog'

urlpatterns = [
    path('api/v1/', include('blog.api.v1.urls', namespace='api-v1'), name='api-v1'),
]
