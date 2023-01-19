import uuid
from user.models import User
from django.db import models


class Income(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, null=False)  # PK
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cost = models.DecimalField(decimal_places=0, max_digits=7, null=False)
    when = models.DateField(editable=True)
    memo = models.CharField(max_length=20, null=True)
    purpose = models.CharField(max_length=10, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'income'
