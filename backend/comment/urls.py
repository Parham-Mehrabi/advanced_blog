from django.urls import path, include

app_name = 'comment'

urlpatterns = [
    path('api/v1/', include('comment.api.v1.urls', namespace='api-v1'), name='api-v1'),
]
