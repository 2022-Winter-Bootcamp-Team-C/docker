from rest_framework import serializers

class GetRequestSerializer(serializers.Serializer):
    param1 = serializers.IntegerField()
    param2 = serializers.CharField(max_length=20)
    param3 = serializers.DateField()


class GetResponseSerializer(serializers.Serializer):
    status = serializers.CharField()
    message = serializers.CharField()

class PostInnerDictSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()

class PostRequestSerializer(serializers.Serializer):
        school_name = serializers.CharField()
        student_list = PostInnerDictSerializer(many=True)

class PostResponseSerializer(serializers.Serializer):
        status = serializers.CharField()
        message = serializers.CharField()
