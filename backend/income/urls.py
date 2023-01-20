from django.urls import path
from . import views
from .views import post_new_income, put_new_Income

urlpatterns = [
    path('income-list/<user_id>', views.get_income_list),  # C-1
    path('new/', post_new_income.as_view()),  # C-2
    path('<id>', put_new_Income.as_view()),  # C-3, C-4
    path('total_income/<user_id>', views.get_income_this_month),  # D-3
    path('3month_sum/<user_id>', views.get_three_month_ago_income),  # D-5
]
