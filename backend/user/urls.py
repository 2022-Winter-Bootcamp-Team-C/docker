from django.urls import path, include
from . import views
from .views import join, login

urlpatterns = [
    path('new/', join.as_view()),
    path('logout/', views.logout),
    path('login/', login.as_view()),
]
