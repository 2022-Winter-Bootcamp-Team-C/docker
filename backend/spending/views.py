import datetime
from decimal import Decimal
from dateutil.relativedelta import relativedelta
from django.db.models import Q
from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Spending
from .serializers import spending_post_serializer, spending_put_serializer, \
    post_spending_data_serializer
from user.models import User
from income.models import Income


@api_view(['GET'])  # B-1  user_id를  전달하면 해당 유저의 지출 내역과 총 지출 조회
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


class post_spending_data(APIView):  # B-2 지출 등록폼 입력 후 DB에 저장
    @swagger_auto_schema(request_body=post_spending_data_serializer)
    def post(self, request):
        if int(request.data['cost']) > 9999999 or int(request.data['cost']) < 0:
            return JsonResponse({'memssage': "금액은 최대 9,999,999을 넘을 수 없거나 음수를 입력할 수 없습니다."}
                                , safe=False, status=status.HTTP_400_BAD_REQUEST)
        reqData = request.data
        serializer = spending_post_serializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class put_delete_data(APIView):  # B-3 지출 내역 수정, B-4 지출 내역 삭제
    @swagger_auto_schema(request_body=post_spending_data_serializer)
    def put(self, request, id):
        data = Spending.objects.get(id=id)  # 앞의 id는 Spending 테이블의 칼럼, 뒤의 id는 요청 값으로 전달하는 id 의미
        if data.is_deleted:
            return JsonResponse({'memssage': "삭제된 지출 내역입니다."}, safe=False, status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'PUT':
            reqData = request.data  # reqData는 내가 수정을 원해서 서버에 전달하는 json데이터를 의미
            serializer = spending_put_serializer(instance=data, data=reqData)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        if request.method == 'DELETE':
            delete_data = Spending.objects.filter(id=id, is_deleted=False)
            delete_data.update(is_deleted=True)
            return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])  # D-1 용도별 지출 비율
def get_spending_rate_by_purpose(request, user_id):
    all_purpose = Spending.objects.filter(user_id=user_id, is_deleted=False)
    all_spending_cost = total_calculation(all_purpose)
    food_cost = transportation_cost = alcohol_cost = mobile_cost = beauty_cost = shopping_cost = 0

    for i in all_purpose:
        if i.purpose == "식사":
            food_cost += i.cost
        elif i.purpose == "교통/차량":
            transportation_cost += i.cost
        elif i.purpose == "술/유흥":
            alcohol_cost += i.cost
        elif i.purpose == "주거/통신":
            mobile_cost += i.cost
        elif i.purpose == "쇼핑":
            shopping_cost += i.cost
        else:
            beauty_cost += i.cost

    food_rate = round((food_cost / all_spending_cost) * 100, 1)
    transportation_rate = round((transportation_cost / all_spending_cost) * 100, 1)
    alcohol_rate = round((alcohol_cost / all_spending_cost) * 100, 1)
    mobile_rate = round((mobile_cost / all_spending_cost) * 100, 1)
    beauty_rate = round((beauty_cost / all_spending_cost) * 100, 1)
    shopping_rate = round((shopping_cost / all_spending_cost) * 100, 1)

    return JsonResponse({'food_rate': food_rate, 'transportation_rate': transportation_rate,
                         'alcohol_rate': alcohol_rate, 'mobile_rate': mobile_rate,
                         'beauty_rate': beauty_rate, 'shopping_rate': shopping_rate}, safe=False,
                        status=status.HTTP_200_OK)


this_month_ago = datetime.datetime.now()  # 이번 달
last_month_ago = datetime.datetime.now() - relativedelta(months=1)  # 한 달 전
two_month_ago = datetime.datetime.now() - relativedelta(months=2)  # 두 달 전
three_month_ago = datetime.datetime.now() - relativedelta(months=3)  # 세 달 전


@api_view(['GET'])  # D-2 금월 지출 조회
def get_spending_this_month(request, user_id):
    this_month_spending = Spending.objects.filter(user_id=user_id, when__month=this_month_ago.month, is_deleted=False)

    total_spending = total_calculation(this_month_spending)

    return JsonResponse({'total_spending': format(total_spending, ',')}, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])  # D-4 한 달 전 지출 비교
def get_comparison_last_month(request, user_id):
    total_last_month_spending = total_this_month_spending = 0

    q = Q()
    q.add(Q(user_id=user_id), q.OR)
    q.add(Q(when__month=last_month_ago.month) | Q(when__month=this_month_ago.month), q.AND)
    total_spending = Spending.objects.filter(q)

    for i in total_spending:
        if i.when.month == last_month_ago.month:
            total_last_month_spending += i.cost
        else:
            total_this_month_spending += i.cost

    comparison_total_spending = format(total_this_month_spending - total_last_month_spending, ',')

    return JsonResponse({'comparison_total_spending': comparison_total_spending}, safe=False,
                        status=status.HTTP_200_OK)


@api_view(['GET'])  # D-6 3개월 전(10월) 지출 총합
def get_three_month_ago_spending(request, user_id):
    three_month_ago_spending = Spending.objects.filter(user_id=user_id, when__month=three_month_ago.month
                                                       , is_deleted=False)
    total_three_month_ago_spending = total_calculation(three_month_ago_spending)

    return JsonResponse({'total_three_month_ago_spending': format(total_three_month_ago_spending, ',')}, safe=False,
                        status=status.HTTP_200_OK)


@api_view(['GET'])  # D-7 금월 수입 지출 비율
def get_spending_income_ratio_this_month(request, user_id):
    this_month_spending = Spending.objects.filter(user_id=user_id, when__month=this_month_ago.month, is_deleted=False)
    total_spending = total_calculation(this_month_spending)

    this_month_income = Income.objects.filter(user_id=user_id, when__month=this_month_ago.month, is_deleted=False)
    total_income = total_calculation(this_month_income)

    total_cost = total_income + total_spending

    income_ratio = round((total_income / total_cost) * 100, 1)
    spending_ratio = round((total_spending / total_cost) * 100, 1)

    return JsonResponse({'income_ratio': income_ratio, 'spending_ratio': spending_ratio}, safe=False,
                        status=status.HTTP_200_OK)


@api_view(['GET'])  # D-8 최근 3개월(10, 11, 12) 각 총 수입 지출 조회, 3개월 지출 , 수입 평균 조회
def get_spending_income_ratio_3month(request, user_id):
    last_month_ago_total_spending = two_month_ago_total_spending = three_month_ago_total_spending = 0
    last_month_ago_total_income = two_month_ago_total_income = three_month_ago_total_income = 0

    total_spending = Spending.objects.filter(user_id=user_id
                                             , when__month__gte=three_month_ago.month
                                             , when__month__lte=last_month_ago.month)

    for i in total_spending:
        if i.when.month == last_month_ago.month:
            last_month_ago_total_spending += i.cost
        elif i.when.month == two_month_ago.month:
            two_month_ago_total_spending += i.cost
        else:
            three_month_ago_total_spending += i.cost

    total_income = Income.objects.filter(user_id=user_id
                                         , when__month__gte=three_month_ago.month
                                         , when__month__lte=last_month_ago.month)

    for i in total_income:
        if i.when.month == last_month_ago.month:
            last_month_ago_total_income += i.cost
        elif i.when.month == two_month_ago.month:
            two_month_ago_total_income += i.cost
        else:
            three_month_ago_total_income += i.cost

    three_month_spending_avg = Decimal.from_float(float((last_month_ago_total_spending
                                                         + two_month_ago_total_spending
                                                         + three_month_ago_total_spending) / 3))

    three_month_income_avg = Decimal.from_float(float((last_month_ago_total_income
                                                       + two_month_ago_total_income
                                                       + three_month_ago_total_income) / 3))

    return JsonResponse({'last_month_ago_total_income': last_month_ago_total_income,
                         'last_month_ago_total_spending': last_month_ago_total_spending,
                         'two_month_ago_total_income': two_month_ago_total_income,
                         'two_month_ago_total_spending': two_month_ago_total_spending,
                         'three_month_ago_total_income': three_month_ago_total_income,
                         'three_month_ago_total_spending': three_month_ago_total_spending,
                         'three_month_spending_avg': three_month_spending_avg,
                         'three_month_income_avg': three_month_income_avg}, safe=False,
                        status=status.HTTP_200_OK)


def total_calculation(query_sets):
    total = 0
    for i in query_sets:
        total += i.cost
    return total
