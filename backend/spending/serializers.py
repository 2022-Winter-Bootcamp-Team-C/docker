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


class spending_get_totalcost_serializer(ModelSerializer):
    class Meta:
        model = Spending
        fields = ['cost']


class spending_delete_serializer(ModelSerializer):
    class Meta:
        model = Spending
        fields = ['is_deleted']


