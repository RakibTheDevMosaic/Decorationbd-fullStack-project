from django.urls import path
from .views import *
urlpatterns = [
      path('customershippingaddress/',  CustomerShippingAddressView.as_view()),
      path('customerbillingaddress/',  CustomerBillingAddressView.as_view()),
]