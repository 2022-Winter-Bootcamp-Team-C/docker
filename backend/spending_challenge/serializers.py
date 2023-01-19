from rest_framework.serializers import ModelSerializer

from .models import Spending_challenge


class spending_challenge_post_serializer(ModelSerializer):
    class Meta:
        model = Spending_challenge
        fields = '__all__'
