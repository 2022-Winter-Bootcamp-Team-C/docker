from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Spending_challenge


class spending_challenge_post_serializer(ModelSerializer):
    class Meta:
        model = Spending_challenge
        fields = ["user", 'budget']

class post_sending_challenge_serializer(serializers.Serializer):
    user = serializers.CharField()
    budget = serializers.IntegerField()
