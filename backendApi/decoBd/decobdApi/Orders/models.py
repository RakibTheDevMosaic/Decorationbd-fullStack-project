from django.db import models
from Cart.models import Cart
from Users.models import User
from django.utils import timezone
from django.utils.dateformat import format
from customerSection.models import CustomerShippingAddress
from Coupon.models import Coupon
# Create your models here.

class Order(models.Model):
    PAYMENT_METHOD = (
        ('Cash on Delivery','Cash on Delivery'),
        ('Full Payment','Full Payment'),
    )
    STATUS = (
        ('Processing','Processing'),
        ('Packed','Packed'),
        ('On the Way','On the Way'),
        ('Delivered','Delivered')
    )
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order_items = models.ManyToManyField(Cart)
    created = models.DateTimeField(auto_now_add=True)
    shipping_address = models.ForeignKey(CustomerShippingAddress,on_delete=models.CASCADE,blank=True,null=True)
    payment_method = models.CharField(max_length=50,choices=PAYMENT_METHOD,default='Full Payment')
    status = models.CharField(max_length=50,choices=STATUS,default='Processing')
    total_price = models.DecimalField(decimal_places=2,max_digits=10)
    after_partial_cod_remain_total_price = models.DecimalField(decimal_places=2,max_digits=10,default=0)
    partial_cod = models.DecimalField(decimal_places=2,max_digits=10,default=0)
    for_order_confirmation = models.DecimalField(decimal_places=2,max_digits=10,default=0)
    coupon = models.ForeignKey(Coupon,null=True,blank=True,on_delete=models.SET_NULL)
    coupon_applied = models.BooleanField(default=False)

    @property
    def delivery_date(self):
        return format(self.created + timezone.timedelta(days=7), 'j F, Y')
    
 
