import json
from math import trunc
import datetime
from dateutil.relativedelta import relativedelta
from multiprocessing import connection

from django.core import serializers
from django.db.models import Sum
from django.http import JsonResponse
from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from dateutil.relativedelta import relativedelta

from .models import Income
from user.models import User

from .serializers import get_income_serializer, post_income_serializer, put_income_serializer, \
    income_post_data_serializer


@api_view(['GET'])  # C-1 해당 유저 수입 내역 조회
def get_income_list(request, user_id):
    try:
        bool(User.objects.get(user_id=user_id))
    except:
        return JsonResponse({'message': "존재하지 않는 user"}, safe=False, status=status.HTTP_404_NOT_FOUND)

    datas = Income.objects.filter(user_id=user_id, is_deleted=False)

    if len(datas) == 0:
        return JsonResponse({'message': "수입 내역이 없습니다."}, safe=False, status=status.HTTP_404_NOT_FOUND)

    total_cost = 0

    for i in datas:
        total_cost += i.cost
        income_list = []
        for data in datas:
            income_list.append({
                "id": data.id,
                "when": data.when,
                "cost": data.cost,
                "memo": data.memo,
            })

    return JsonResponse({"user_id": user_id, "income_list": income_list, 'total_cost': int(total_cost)},
                        status=status.HTTP_200_OK)


class post_new_income(APIView):     # C-2 해당 유저 수입 등록
    @swagger_auto_schema(request_body=income_post_data_serializer)
    def post(self, request):
        if int(request.data['cost']) > 9999999:
            return JsonResponse({'memssage': "금액은 최대 9,999,999원입니다."}
                                , safe=False, status=status.HTTP_400_BAD_REQUEST)
        serializer = post_income_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class put_new_Income(APIView):       # C-3,4 해당 유저 수입 수정, 삭제
    @swagger_auto_schema(request_body=income_post_data_serializer)
    def put(self, request, id):
        data = Income.objects.get(id=id)  # 앞의 id는 Spending 테이블의 칼럼, 뒤의 id는 요청 값으로 전달하는 id 의미
        if data.is_deleted:
            return JsonResponse({'memssage': "삭제된 수입 내역입니다."}
                                , safe=False, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'PUT':
            reqData = request.data  # reqData는 내가 수정을 원해서 서버에 전달하는 json데이터를 의미
            serializer = put_income_serializer(instance=data, data=reqData)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        if request.method == 'DELETE':
            delete_data = Income.objects.filter(id=id, is_deleted=False)
            delete_data.update(is_deleted=True)
            return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])  # D-3 금월 총 수입
def get_income_this_month(request, user_id):
    this_month = datetime.datetime.now().month
    this_month_income = Income.objects.filter(user_id=user_id, when__month=this_month, is_deleted=False)

    total_income = 0

    for i in this_month_income:
        total_income += i.cost

    return JsonResponse({'total_income': format(total_income, ',')}, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])  # D-5 3개월 전 수입 총합
def get_three_month_ago_income(request, user_id):
    three_month_ago = datetime.datetime.now() - relativedelta(months=3)

    three_month_ago_income = Income.objects.filter(when__month=three_month_ago.month)
    total_three_month_ago_income = 0
    for i in three_month_ago_income:
        total_three_month_ago_income += i.cost

    return JsonResponse({'total_three_month_ago_income': format(total_three_month_ago_income, ',')}, safe=False,
                        status=status.HTTP_200_OK)
