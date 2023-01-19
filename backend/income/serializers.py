import uuid

from django.db.models import Sum
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Income
from user.models import User


class get_income_serializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['id', 'cost', 'when', 'purpose', 'memo']


class post_income_serializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['user', 'cost', 'when', 'purpose', 'memo']


class put_income_serializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class delete_serializer(ModelSerializer):
    class Meta:
        model = Income
        fields = ['is_deleted']


class post_income_serializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['user', 'cost', 'when', 'purpose', 'memo']
