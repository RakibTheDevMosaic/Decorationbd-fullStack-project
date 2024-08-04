from django.urls import path
from .views import *
urlpatterns = [
    path('sliderImg/',SliderImageView.as_view(),name='products'),
]