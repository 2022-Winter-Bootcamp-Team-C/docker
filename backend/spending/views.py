import json
from math import trunc
from multiprocessing import connection
import datetime
from dateutil.relativedelta import relativedelta
from django.db.models import Sum
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Spending
from .serializers import spending_get_serializer, spending_get_totalcost_serializer, \
    spending_delete_serializer, spending_post_serializer
from user.models import User


@api_view(['GET'])
def get_spending_datas(request, user_id):
    try:
        bool(User.objects.get(user_id=user_id))
    except:
        return JsonResponse({'message': "존재하지 않는 user"}, safe=False, status=status.HTTP_404_NOT_FOUND)

    spending_datas = Spending.objects.filter(user_id=user_id, is_deleted=False)

    if len(spending_datas) == 0:
        return JsonResponse({'message': "지출 내역이 없습니다."}, safe=False, status=status.HTTP_404_NOT_FOUND)

    total_spending = 0

    for i in spending_datas:
        total_spending += i.cost
        spending_list = []
        for spending_data in spending_datas:
            spending_list.append({
                "id": spending_data.id,
                "when": spending_data.when,
                "cost": spending_data.cost,
                "purpose": spending_data.purpose,
                "memo": spending_data.memo,
            })

    return JsonResponse({"user_id": user_id, "spending_list": spending_list, 'total_spending': int(total_spending)},
                        status=status.HTTP_200_OK)


@api_view(['POST'])  # B-2 지출 등록폼 입력 후 DB에 저장
def post_spending_data(request):
    if int(request.data['cost']) > 9999999:
        return JsonResponse({'memssage': "금액은 최대 9,999,999원입니다."}
                            , safe=False, status=status.HTTP_400_BAD_REQUEST)
    reqData = request.data
    serializer = spending_post_serializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])  # B-3 지출 내역 수정, B-4 지출 내역 삭제
def put_delete_data(request, id):
    data = Spending.objects.get(id=id)  # 앞의 id는 Spending 테이블의 칼럼, 뒤의 id는 요청 값으로 전달하는 id 의미
    if data.is_deleted:
        return JsonResponse({'memssage': "삭제된 지출 내역입니다."}
                            , safe=False, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        reqData = request.data  # reqData는 내가 수정을 원해서 서버에 전달하는 json데이터를 의미
        serializer = spending_post_serializer(instance=data, data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        delete_data = Spending.objects.filter(id=id, is_deleted=False)
        delete_data.update(is_deleted=True)
        return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])  # D-1 용도별 지출 비율
def get_spending_rate_by_purpose(request, user_id):
    all_purpose = Spending.objects.filter(user_id=user_id, is_deleted=False)
    all_spending_cost = 0
    for i in all_purpose:
        all_spending_cost += i.cost

    food_querySet = Spending.objects.filter(user_id=user_id, purpose="식사", is_deleted=False)
    food_cost = 0
    for i in food_querySet:
        food_cost += i.cost

    transportation_querySet = Spending.objects.filter(user_id=user_id, purpose="교통/차량", is_deleted=False)
    transportation_cost = 0
    for i in transportation_querySet:
        transportation_cost += i.cost

    alcohol_querySet = Spending.objects.filter(user_id=user_id, purpose="술/유흥", is_deleted=False)
    alcohol_cost = 0
    for i in alcohol_querySet:
        alcohol_cost += i.cost

    mobile_querySet = Spending.objects.filter(user_id=user_id, purpose="주거/통신", is_deleted=False)
    mobile_cost = 0
    for i in mobile_querySet:
        mobile_cost += i.cost

    beauty_querySet = Spending.objects.filter(user_id=user_id, purpose="뷰티/미용", is_deleted=False)
    beauty_cost = 0
    for i in beauty_querySet:
        beauty_cost += i.cost

    food_rate = round((food_cost / all_spending_cost) * 100, 1)
    transportation_rate = round((transportation_cost / all_spending_cost) * 100, 1)
    alcohol_rate = round((alcohol_cost / all_spending_cost) * 100, 1)
    mobile_rate = round((mobile_cost / all_spending_cost) * 100, 1)
    beauty_rate = round((beauty_cost / all_spending_cost) * 100, 1)

    return JsonResponse({'food_rate': food_rate, 'transportation_rate': transportation_rate,
                         'alcohol_rate': alcohol_rate, 'mobile_rate': mobile_rate,
                         'beauty_rate': beauty_rate}, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])  # D-2 금월 지출 조회
def get_spending_this_month(request, user_id):
    this_month = datetime.datetime.now().month
    this_month_spending = Spending.objects.filter(user_id=user_id, when__month=this_month, is_deleted=False)

    total_spending = 0

    for i in this_month_spending:
        total_spending += i.cost

    return JsonResponse({'total_spending': format(total_spending, ',')}, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])  # D-4 한 달 전 지출 비교
def get_comparison_last_month(request, user_id):
    this_month_date = datetime.datetime.now()
    last_month_date = this_month_date - relativedelta(months=1)

    this_month_spending = Spending.objects.filter(user_id=user_id, when__month=this_month_date.month, is_deleted=False)
    total_this_month_spending = 0
    for i in this_month_spending:
        total_this_month_spending += i.cost

    last_month_spending = Spending.objects.filter(user_id=user_id, when__month=last_month_date.month, is_deleted=False)
    total_last_month_spending = 0
    for i in last_month_spending:
        total_last_month_spending += i.cost

    comparison_total_spending = format(total_this_month_spending - total_last_month_spending, ',')

    return JsonResponse({'comparison_total_spending': comparison_total_spending}, safe=False,
                        status=status.HTTP_200_OK)


@api_view(['GET'])  # D-6 3개월 내 지출 총합
def get_three_month_ago_spending(request, user_id):
    three_month_ago_date = datetime.datetime.now() - relativedelta(months=3)

    three_month_ago_spending = Spending.objects.filter(user_id=user_id, when__month=three_month_ago_date.month
                                                       , is_deleted=False)
    total_three_month_ago_spending = 0
    for i in three_month_ago_spending:
        total_three_month_ago_spending += i.cost

    return JsonResponse({'total_three_month_ago_spending': format(total_three_month_ago_spending, ',')}, safe=False,
                        status=status.HTTP_200_OK)


@api_view(['GET'])  # D-7 3개월 내 지출 평균 조회
def get_three_month_spending_average(request, user_id):
    start_month = datetime.datetime.now() - relativedelta(months=3)
    end_month = datetime.datetime.now() - relativedelta(months=1)

    three_month_spending = Spending.objects.filter(user_id=user_id
                                                   , when__gte=start_month
                                                   , when__lte=end_month)

    total_three_month_spending = 0
    for i in three_month_spending:
        total_three_month_spending += i.cost

    three_month_spending_average = float(round(total_three_month_spending / 3, 1))

    return JsonResponse({'three_month_spending_average': format(three_month_spending_average, ',')}, safe=False,
                        status=status.HTTP_200_OK)
