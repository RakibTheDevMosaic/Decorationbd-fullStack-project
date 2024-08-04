# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Cart
from .serializer import CartSerializer
from Products.models import Product
from Coupon.models import Coupon
from decimal import Decimal
# from rest_framework.permissions import IsAuthenticated

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    @action(detail=False, methods=['POST'])
    def add_item(self, request, *args, **kwargs):
        try:
            user = request.user
            product_id = int(request.data.get('products_id'))
            quantity = request.data.get('quantity')

            product = Product.objects.get(id=product_id)
            cart, created = Cart.objects.get_or_create(user=user, products_id=product_id)
            if not created:
                cart.quantity = int(cart.quantity) + int(quantity)
            else:
                cart.quantity = int(quantity)
            cart.save()

            serializer = self.get_serializer(cart)
            return Response({"data": serializer.data, "message": "Cart item created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['DELETE'])
    def cartitem_delete(self, request, *args, **kwargs):
        try:
            user = request.user
            cart_item_id = kwargs.get('pk')

            cart_item = Cart.objects.filter(id=cart_item_id, user=user)
            cart_item.delete()

            return Response({"message": "Cart item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({'message': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['DELETE'])
    def allcart_delete(self, request, *args, **kwargs):
        user = request.user
        cart_items = Cart.objects.filter(user=user)
        for cart_item in cart_items:
            cart_item.delete()
        return Response({"message": "All cart items deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['PATCH'])
    def update_item(self, request, *args, **kwargs):
        try:
            user = request.user
            cart_item_id = kwargs.get('pk')
            quantity = int(request.data.get('quantity'))

            cart_item = Cart.objects.get(id=cart_item_id, user=user)
            if quantity >= 1:
                cart_item.quantity = quantity
                cart_item.save()
                serializer = self.get_serializer(cart_item)
                return Response({"data": serializer.data, "message": "Cart item updated successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Sorry ! Cart item quantity cannot be zero.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['PATCH'])
    def update_is_checked(self, request, *args, **kwargs):
        try:
            user = request.user
            cart_item_id = kwargs.get('pk')
            is_checked = request.data.get('is_checked')
            print(f'Received is_checked value: {is_checked} for cart item ID: {cart_item_id}')
            cart_item = Cart.objects.get(id=cart_item_id, user=user)
            cart_item.is_checked = is_checked
            cart_item.save()
            print(cart_item.is_checked)

            serializer = self.get_serializer(cart_item)
            return Response({"data": serializer.data, "message": "Cart item checked state updated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['GET'])
    def cartlist(self, request, *args, **kwargs):
        user = request.user
        cart_items = Cart.objects.filter(user=user)
        serializer = self.get_serializer(cart_items, many=True)  # Add many=True here
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def add_coupon(self, request):
        user = request.user
        coupon_code = request.data.get('coupon')

        if not coupon_code:
            return Response({'msg': 'Coupon code is required'}, status=status.HTTP_400_BAD_REQUEST)

        coupon = Coupon.objects.filter(code=coupon_code, active=True).first()
        if not coupon:
            return Response({'msg': 'Invalid Coupon code'}, status=status.HTTP_400_BAD_REQUEST)

        cart_items = Cart.objects.filter(user=user, is_checked = True)
        if not cart_items.exists():
            return Response({'msg': 'No items in cart'}, status=status.HTTP_400_BAD_REQUEST)

        # Apply coupon to each cart item
        for item in cart_items:
            item.coupon = coupon
            item.coupon_applied = True
            item.save()

        # Serialize the updated cart items
        cart_serializer = CartSerializer(cart_items, many=True)

        # Calculate total price before discount
        total_price = Decimal(cart_serializer.data[0]['total_price'])

        return Response({
            'total_price': total_price,
            'cart_items': cart_serializer.data
        }, status=status.HTTP_200_OK)





         

