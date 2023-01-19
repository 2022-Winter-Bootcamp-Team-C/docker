from django.urls import path, include
from . import views

urlpatterns = [
    path('new/', views.join),
    path('logout/', views.logout),
    path('login/', views.login),
]
