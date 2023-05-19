from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from django.contrib.auth import get_user_model
from account.models import Profile

user = get_user_model()


class CustomUserAdmin(UserAdmin):
    model = user
    list_display = ("email", "is_staff", "is_superuser", "is_active", "is_verified")
    list_filter = ("email", "is_staff", "is_superuser", "is_active")
    search_fields = ("email",)
    ordering = ("email",)

    fieldsets = (
        ('AUTH', {'fields': ('email', 'password')}),
        ('STATUS', {'fields': ("is_staff", "is_superuser", "is_active", "is_verified")})
    )

    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_superuser",
                    "is_active",
                    "is_verified",
                )
            },
        ),
    )


admin.site.register(user, CustomUserAdmin)
admin.site.register(Profile)
