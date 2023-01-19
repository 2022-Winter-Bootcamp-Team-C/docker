from django.urls import path
from . import views

urlpatterns = [
    path('income-list/<user_id>', views.get_income_list),
    path('new/', views.post_new_income),
    path('<id>', views.put_new_Income),
    path('3month_sum/<user_id>', views.get_three_month_ago_income),
    path('total_income/<user_id>', views.get_income_this_month),
]