from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order
from .serializer import OrderSerializer
from Cart.models import Cart
from Cart.serializer import CartSerializer
from customerSection.models import CustomerShippingAddress
from decimal import Decimal
from Coupon.models import Coupon
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class checkoutView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        carts = Cart.objects.filter(user=user,is_checked = True)

        if not carts.exists():
            return Response({'error': 'No items selected for checkout'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

# class PlaceOrderView(APIView):
#     def post(self, request):
#         user = request.user
#         cart_items = Cart.objects.filter(user=user, is_checked=True)
#         if not cart_items.exists():
#             return Response({'error': 'No items in cart'}, status=400)

#         print(f"User {user.id} has {cart_items.count()} items in the cart.")

#         shipping_address_id = request.data.get('shipping_address_id')
#         if shipping_address_id:
#             shipping_address = CustomerShippingAddress.objects.filter(id=shipping_address_id, user=user).first()
#             if not shipping_address:
#                 return Response({'error': 'Invalid shipping address'}, status=400)
#         else:
#             shipping_address_data = request.data.get('shipping_address')
#             if shipping_address_data:
#                 shipping_address, created = CustomerShippingAddress.objects.update_or_create(
#                     user=user,
#                     defaults=shipping_address_data
#                 )
#             else:
#                 return Response({'error': 'Shipping address is required'}, status=400)

#         payment_method = request.data.get('payment_method')
#         if payment_method not in [pm[0] for pm in Order.PAYMENT_METHOD]:
#             return Response({'error': 'Invalid payment method'}, status=400)

#         cart_serializer = CartSerializer(cart_items, many=True)
#         total_price = request.data.get('totalPrice')
#         print('Total price from cart_serializer:', total_price)
#         partial_cod = request.data.get('pcod')
#         for_order_confirmation = request.data.get('orderConfirmation')
#         after_partial_cod_remain_total_price = request.data.get('afterRemainTotal')

#         print('Creating a new order...')
#         # Create a new order
#         order = Order.objects.create(
#             user=user,
#             shipping_address=shipping_address,
#             payment_method=payment_method,
#             total_price=total_price,
#             after_partial_cod_remain_total_price=after_partial_cod_remain_total_price,
#             partial_cod=partial_cod,
#             for_order_confirmation=for_order_confirmation,
#         )

#         for item in cart_items:
#             order.order_items.add(item)
#             item.delete()  # Remove item from cart after adding to order

#         # Serialize and return the order
#         serializer = OrderSerializer(order)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


class PlaceOrderView(APIView):
    def post(self, request):
        user = request.user
        cart_items = Cart.objects.filter(user=user, is_checked=True)
        if not cart_items.exists():
            return Response({'error': 'No items in cart'}, status=400)

        print(f"User {user.id} has {cart_items.count()} items in the cart.")

        shipping_address_id = request.data.get('shipping_address_id')
        if shipping_address_id:
            # Check if the shipping address exists
            try:
                shipping_address = CustomerShippingAddress.objects.get(id=shipping_address_id, user=user)
                # Update the existing address
                shipping_address_data = request.data.get('shipping_address', {})
                for attr, value in shipping_address_data.items():
                    setattr(shipping_address, attr, value)
                shipping_address.save()
            except CustomerShippingAddress.DoesNotExist:
                return Response({'error': 'Invalid shipping address'}, status=400)
        else:
            # Create a new shipping address
            shipping_address_data = request.data.get('shipping_address')
            if shipping_address_data:
                # Ensure the shipping_address_data includes the user
                shipping_address_data['user'] = user
                shipping_address = CustomerShippingAddress.objects.create(**shipping_address_data)
            else:
                return Response({'error': 'Shipping address is required'}, status=400)

        payment_method = request.data.get('payment_method')
        if payment_method not in [pm[0] for pm in Order.PAYMENT_METHOD]:
            return Response({'error': 'Invalid payment method'}, status=400)

        cart_serializer = CartSerializer(cart_items, many=True)
        total_price = request.data.get('totalPrice')
        print('Total price from cart_serializer:', total_price)
        partial_cod = request.data.get('pcod')
        for_order_confirmation = request.data.get('orderConfirmation')
        after_partial_cod_remain_total_price = request.data.get('afterRemainTotal')

        print('Creating a new order...')
        # Create a new order
        order = Order.objects.create(
            user=user,
            shipping_address=shipping_address,
            payment_method=payment_method,
            total_price=total_price,
            after_partial_cod_remain_total_price=after_partial_cod_remain_total_price,
            partial_cod=partial_cod,
            for_order_confirmation=for_order_confirmation,
        )

        for item in cart_items:
            order.order_items.add(item)
            item.delete()  # Remove item from cart after adding to order

        # Serialize and return the order
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



    





# class PlaceOrderView(APIView):
#     def post(self, request):
#         user = request.user
#         cart_items = Cart.objects.filter(user=user,is_checked = True)
#         if not cart_items.exists():
#             return Response({'error': 'No items in cart'}, status=400)

#         print(f"User {user.id} has {cart_items.count()} items in the cart.")

#         shipping_address_id = request.data.get('shipping_address_id')
#         if shipping_address_id:
#             shipping_address = CustomerShippingAddress.objects.filter(id=shipping_address_id, user=user).first()
#             if not shipping_address:
#                 return Response({'error': 'Invalid shipping address'}, status=400)
#         else:
#             shipping_address_data = request.data.get('shipping_address')
#             if shipping_address_data:
#                 shipping_address = CustomerShippingAddress.objects.create(**shipping_address_data, user=user)
#             else:
#                 return Response({'error': 'Shipping address is required'}, status=400)

#         payment_method = request.data.get('payment_method')
#         if payment_method not in [pm[0] for pm in Order.PAYMENT_METHOD]:
#             return Response({'error': 'Invalid payment method'}, status=400)

        # cart_serializer = CartSerializer(cart_items, many=True)
        # total_price = Decimal(cart_serializer.data[0].get('total_price'))
        # total_price = request.data.get('totalPrice')
        # print('Total price from cart_serializer:', total_price)
        # delivery_charge = Decimal(150)
        # partial_cod = Decimal(0)
        # partial_cod = request.data.get('pcod')
        # for_order_confirmation = total_price + delivery_charge
        # for_order_confirmation = request.data.get('orderConfirmation')
        # after_partial_cod_remain_total_price = Decimal(0)
        # after_partial_cod_remain_total_price = request.data.get('afterRemainTotal')

        # if payment_method == 'Cash on Delivery':
        #     partial_cod = Decimal(50)
        #     for_order_confirmation = partial_cod + delivery_charge
        #     total_price += delivery_charge
        #     after_partial_cod_remain_total_price = total_price - delivery_charge
        #     print('COD after partial total:', after_partial_cod_remain_total_price)
        # else:
        #     after_partial_cod_remain_total_price = total_price 

        # print('Checking for existing order with status Processing...')
        # Check if there's an existing order with status 'Processing'
        # order = Order.objects.filter(user=user, status='Processing').first()
        # if order:
            # print('Existing order found. Checking for duplicate items...')
            # Check if the cart items are already in the order
            # existing_items = {item.id: item.quantity for item in order.order_items.all()}
            # new_items = {item.id: item.quantity for item in cart_items}
            # duplicate_items = True
            # for item_id, quantity in new_items.items():
                # if item_id not in existing_items or existing_items[item_id] != quantity:
                    # duplicate_items = False
                    # break
            
            # if not duplicate_items:
                # print('New items found. Updating the existing order...')
                # Add new items to the existing order
                # for item in cart_items:
                    # if item.id not in existing_items:
                    #     order.order_items.add(item)
                    #     item.save()
                # Update the total prices of the existing order
                # order.total_price = total_price
                # print('Order total price updated to:', order.total_price)
                # order.after_partial_cod_remain_total_price = after_partial_cod_remain_total_price
                # order.for_order_confirmation = for_order_confirmation
                # order.save()
            # else:
                # print('No new items found. Order not updated.')
        # else:
        #     print('No existing order found. Creating a new order...')
            # Create a new order
            # order = Order.objects.create(
            #     user=user,
            #     shipping_address=shipping_address,
            #     payment_method=payment_method,
            #     total_price=total_price,
            #     after_partial_cod_remain_total_price=after_partial_cod_remain_total_price,
            #     partial_cod=partial_cod,
            #     for_order_confirmation=for_order_confirmation,
            # )

        #     for item in cart_items:
        #         order.order_items.add(item)
        #         item.save()

        # # Serialize and return the order
        # serializer = OrderSerializer(order)
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
 
    

class AllOrdersView(APIView):
    def get(self,request):
        user = request.user
        items = Order.objects.filter(user=user)
        serializer = OrderSerializer(items,many=True)
        return Response(serializer.data,status=200)   


class AddCouponToCheckout(APIView):
    def post(self, request):
        user = request.user
        cart_items = Cart.objects.filter(user=user)

        if not cart_items.exists():
            return Response({'error': 'No items in cart'}, status=400)

        # Calculate the total price of items in the cart
        cart_serializer = CartSerializer(cart_items, many=True)
        total_price = Decimal(cart_serializer.data[0].get('total_price'))

        # Apply a new coupon
        coupon_code = request.data.get('coupon')
        if not coupon_code:
            return Response({'msg': 'Coupon code not provided'}, status=400)
        
        coupon = Coupon.objects.filter(code=coupon_code, active=True).first()
        if not coupon:
            return Response({'msg': 'Invalid or inactive coupon'}, status=400)
        
        # Check if a coupon is already applied to any cart item
        existing_coupon = next((item.coupon for item in cart_items if item.coupon), None)

        if existing_coupon:
            return Response({'msg': 'Coupon already used in cart'}, status=400)
        

        
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


