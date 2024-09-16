from django.db import models
import uuid
from django.utils import timezone

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.is_active:
            self.deleted_at = None
        else:
            self.deleted_at = timezone.now()
        super().save(*args, **kwargs)
