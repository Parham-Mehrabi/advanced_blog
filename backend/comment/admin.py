from django.contrib import admin
from comment.models import Comment, LikeDislike
# Register your models here.


admin.site.register(Comment)
admin.site.register(LikeDislike)
