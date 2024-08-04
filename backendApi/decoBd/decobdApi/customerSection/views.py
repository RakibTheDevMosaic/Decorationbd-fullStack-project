from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import *
from .serializers import *

class CustomerShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        user = request.user
        customer_shipping_address = CustomerShippingAddress.objects.filter(user=user)
        serializer = CustomerShippingAddressSerializer(customer_shipping_address,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = CustomerShippingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request, format=None):
        user = request.user
        shipping_add_id = request.data.get('shipping_address_id')
        try:
            shipping_address = CustomerShippingAddress.objects.get(user=user, id=shipping_add_id)
        except CustomerShippingAddress.DoesNotExist:
            return Response({'msg': 'Shipping address not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CustomerShippingAddressSerializer(shipping_address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        user = request.user
        shipping_add_id = str(request.data.get('shipping_address_id'))
        try:
            shipping_address = CustomerShippingAddress.objects.get(user=user, id=shipping_add_id)
            shipping_address.delete()
            return Response({'msg': 'Shipping address deleted successfully'}, status=status.HTTP_200_OK)
        except CustomerShippingAddress.DoesNotExist:
            return Response({'msg': 'Shipping address not found'}, status=status.HTTP_404_NOT_FOUND)

        

class CustomerBillingAddressView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        customer_billing_address = list(CustomerBillingAddress.objects.filter(user=user))
        serializer = CustomerBillingAddressSerializer(customer_billing_address, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        if request.method == 'POST':
            serializer = CustomerBillingAddressSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request, format=None):
        user = request.user
        billing_add_id = request.data.get('billing_address_id')
        try:
            billing_address = CustomerBillingAddress.objects.get(user=user, id=billing_add_id)
        except CustomerBillingAddress.DoesNotExist:
            return Response({'msg': 'Billing address not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CustomerBillingAddressSerializer(billing_address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      


    def delete(self, request, format=None):
        user = request.user
        billing_add_id = str(request.data.get('billing_address_id'))
        try:
            billing_address = CustomerBillingAddress.objects.get(user=user, id=billing_add_id)
            billing_address.delete()
            return Response({'msg': 'Billing address deleted sucessfully'}, status=status.HTTP_200_OK)
        except CustomerBillingAddress.DoesNotExist:
            return Response({'msg': 'Billing address not found'}, status=status.HTTP_404_NOT_FOUND) 
