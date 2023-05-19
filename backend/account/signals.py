from django.db.models.signals import post_save
from django.dispatch import receiver
from account.models import CustomUser, Profile


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    print('signal triggered')
    if created:
        profile = Profile.objects.create(user=instance)
        profile.save()
