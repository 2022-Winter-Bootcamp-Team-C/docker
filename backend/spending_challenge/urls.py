from django.template.defaulttags import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

urlpatterns = [
    path('new', views.post_sending_challenge_data),
    path('<user_id>', views.get_remaining_budget),
]
