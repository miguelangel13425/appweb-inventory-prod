from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from .models import ProfileModel, UserModel

@receiver(post_save, sender=UserModel)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        ProfileModel.objects.create(user=instance)

@receiver(post_save, sender=UserModel)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(post_delete, sender=UserModel)
def delete_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.delete()