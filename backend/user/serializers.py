from rest_framework import serializers

from .models import User


class UserSignupResponse(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name', 'password', ]

class JoinRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
