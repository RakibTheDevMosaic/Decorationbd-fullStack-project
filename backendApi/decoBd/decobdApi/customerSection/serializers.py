from rest_framework import serializers
from .models import CustomerShippingAddress, CustomerBillingAddress

class CustomerShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerShippingAddress
        fields = ['id','name','phone','email','address','city','zip_code','country']

class CustomerBillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerBillingAddress
        fields = ['id','name','phone','email','address','city','zip_code','country']