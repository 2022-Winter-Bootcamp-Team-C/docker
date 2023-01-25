from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Spending
from .models import User


class spending_get_serializer(ModelSerializer):
    class Meta:
        model = Spending
        fields = ['id', 'when', 'cost', 'purpose', 'memo']


class spending_post_serializer(ModelSerializer):
    class Meta:
        model = Spending
        fields = '__all__'


class spending_put_serializer(ModelSerializer):
    class Meta:
        model = Spending
        fields = ['user', 'when', 'cost', 'purpose', 'memo']


class post_spending_data_serializer(serializers.Serializer):
    user = serializers.CharField()
    cost = serializers.IntegerField()
    when = serializers.DateField()
    memo = serializers.CharField()
    purpose = serializers.CharField()
