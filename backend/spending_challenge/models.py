import uuid

from django.db import models

from user.models import User


class Spending_challenge(models.Model):
    challenge_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, null=False)  # PK
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    budget = models.DecimalField(decimal_places=0, max_digits=7, null=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'spending_challenge'

