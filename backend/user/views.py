import bcrypt as bcrypt
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.messages.storage.cookie import MessageSerializer
from django.contrib.sessions.models import Session
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, DjangoModelPermissions
from rest_framework.response import Response
from .models import User


@api_view(['POST'])
@permission_classes([AllowAny])  # 로그인 필요 x
def join(request):  # A-1 회원 가입
    input_email = request.data['email']
    input_password = request.data['password']

    err_data = {}
    if not (input_email and input_password):
        err_data['error'] = '모든 값을 입력해 주세요.'
        return Response(err_data, status=status.HTTP_404_NOT_FOUND)
    else:
        if User.objects.filter(email=input_email).count() == 0:
            user = User(email=input_email, password=input_password)
            user.save()
            return JsonResponse({"user_id": user.user_id})
        else:
            err_data['error'] = '이미 존재하는 email입니다.'
            return Response(err_data, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])  # 로그인 필요 x
def login(request):  # A-2 로그인
    input_email = request.data['email']
    input_password = request.data['password']

    err_data = {}
    if not (input_email and input_password):
        err_data['error'] = '모든 값을 입력해 주세요.'
        return Response(err_data, status=status.HTTP_404_NOT_FOUND)
    else:
        user = User.objects.get(email=input_email)
        if input_password == user.password:
            return JsonResponse({"user_id": user.user_id, "email": user.email})
        else:
            err_data['error'] = '비밀번호가 일치하지 않습니다'
    return Response(err_data, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])  # 로그인 필요
def logout(request):  # A-3 로그아웃
    request.session.flush()
    return Response(status=status.HTTP_200_OK)
