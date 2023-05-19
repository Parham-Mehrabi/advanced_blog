from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls', namespace='account'), name='account'),
    path('blog/', include('blog.urls', namespace='blog'), name='blog'),
]
