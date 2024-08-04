from django.urls import path
from .views import *
urlpatterns = [
    path('banner/',BannerImageView.as_view()),
]