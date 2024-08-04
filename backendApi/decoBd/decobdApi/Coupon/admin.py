from django.contrib import admin
from .models import Coupon
# Register your models here.
class CouponAdmin(admin.ModelAdmin):
    list_display = ('id','code','discount','active')

admin.site.register(Coupon,CouponAdmin)    