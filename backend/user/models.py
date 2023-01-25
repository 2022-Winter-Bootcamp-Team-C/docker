import uuid
from django.db import models


class User(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, null=False)
    email = models.EmailField(max_length=200, null=False,default=False)
    password = models.CharField(max_length=255, null=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    deleted_at = models.DateTimeField(auto_now=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'user'
