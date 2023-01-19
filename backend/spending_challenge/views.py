from django.core.exceptions import MultipleObjectsReturned
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import datetime
from dateutil.relativedelta import relativedelta
from .models import Spending_challenge
from .serializers import spending_challenge_post_serializer
from spending.models import Spending

from user.models import User


# ..spending.models

# Create your views here.

@api_view(['POST'])  # E-1 지출 챌린지 금액을 설정하면 DB에 저장
def post_sending_challenge_data(request):
    data = request.data

    duplicate_check = Spending_challenge.objects.filter(user_id=request.data['user'])

    exist_user_check = User.objects.filter(user_id=request.data['user'])

    if len(duplicate_check) > 0:  # user_id 중복 체크
        return JsonResponse({"message": "챌린지가 존재합니다."}, status=401)

    if len(exist_user_check) == 0:  # user_id 중복 체크
        return JsonResponse({"message": "존재하지 않는 user입니다."}, status=401)

    serializer = spending_challenge_post_serializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])  # E-2 남은 챌린지 금액 반환
def get_remaining_budget(request, user_id):
    challenge = Spending_challenge.objects.get(user_id=user_id)
    budget = challenge.budget

    this_month = datetime.datetime.now().month
    this_month_spending = Spending.objects.filter(user_id=user_id, when__month=this_month)

    total_spending = 0

    for i in this_month_spending:
        total_spending += i.cost

    remaining_budget = budget - total_spending

    return JsonResponse({"remaining_budget": format(remaining_budget, ',')}, safe=False, status=status.HTTP_200_OK)
