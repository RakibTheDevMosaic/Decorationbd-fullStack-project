# serializers.py
from rest_framework import serializers
from .models import Cart
from Products.serializers import ProductSerializer
from Coupon.models import Coupon
from Coupon.serializer import CouponSerializer
from decimal import Decimal

class CartSerializer(serializers.ModelSerializer):
    products = ProductSerializer(read_only=True)
    products_id = serializers.IntegerField()
    sub_total = serializers.SerializerMethodField(read_only=True)
    total_price = serializers.SerializerMethodField(read_only=True)
    total_cartitems = serializers.SerializerMethodField(read_only=True)
    coupon = CouponSerializer(read_only=True)
    is_checked = serializers.BooleanField(default=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'products', 'products_id', 'quantity', 'coupon', 'coupon_applied', 'sub_total', 'total_price', 'total_cartitems','is_checked']

    def get_sub_total(self, cart):
        return cart.quantity * cart.products.discount_price

    def get_total_price(self, cart):
        # Only include checked items in the total price calculation
        checked_items = cart.user.carts.filter(is_checked=True)
        total_price = sum(item.quantity * item.products.discount_price for item in checked_items)
        
        # Apply coupon discount if applicable
        if cart.coupon:
            discount = Decimal(cart.coupon.discount) / Decimal(100)
            discount_amount = total_price * discount
            total_price -= discount_amount
            
        return total_price

    def get_total_cartitems(self, cart):
        # Only count the quantities of checked items
        checked_items = cart.user.carts.filter(is_checked=True)
        return sum(item.quantity for item in checked_items)