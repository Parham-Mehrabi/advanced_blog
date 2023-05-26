from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from account.models import Profile


class LoginTokenSerializer(TokenObtainPairSerializer):
    """ costume token obtain serializer """
    def validate(self, attrs):
        """
            add some extra fields here because to_representation is not working with this package's serializers
        """
        data = super().validate(attrs)
        data['user'] = self.get_user_details(self.user)
        return data

    def get_user_details(self, user):
        """
            retrieve user and profile details
        """
        profile = Profile.objects.get(user=user)
        profile_details = {'first_name': profile.first_name, 'last_name': profile.last_name,
                           'description': profile.description}
        if profile.image:
            profile_details['image'] = profile.image
        else:
            profile_details['image'] = ''
        user_details = {'user_id': user.id,
                        'email': user.email,
                        'is_active': user.is_active,
                        'is_verified': user.is_verified,
                        'is_staff': user.is_staff,
                        'is_superuser': user.is_superuser,
                        'profile': profile_details}

        return user_details
