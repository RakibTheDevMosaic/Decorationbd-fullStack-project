from django.db import models
from Users.models import User
from Products.models import Product
from Coupon.models import Coupon
# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="carts")
    products = models.ForeignKey(Product, on_delete=models.CASCADE,related_name="cart_items")
    quantity = models.IntegerField(default=1)
    coupon = models.ForeignKey(Coupon,null=True,blank=True,on_delete=models.SET_NULL)
    coupon_applied = models.BooleanField(default=False)
    is_checked = models.BooleanField(default=True)
    def __str__(self):
        return f"cartitem - {self.products.name}"