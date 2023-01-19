from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.ocr_receipt),
    path('save', views.save_image),
]