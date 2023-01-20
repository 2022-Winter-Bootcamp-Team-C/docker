from django.template.defaulttags import url
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views import post_sending_challenge_data

urlpatterns = [
    path('new/', post_sending_challenge_data.as_view()),
    path('<user_id>', views.get_remaining_budget),
]
