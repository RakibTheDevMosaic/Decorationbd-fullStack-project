from django.contrib import admin
from Orders.models import Order
# Register your models here.

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','user','get_items','shipping_address','total_price','status')

    def get_shipping_address(self, obj):
        if obj.shipping_address:
            return obj.shipping_address.address
        else:
            return ''
    get_shipping_address.short_description = 'Shipping Address'


    def get_items(self, obj):
        return ', '.join(item.products.name for item in obj.order_items.all())
    get_items.short_description = 'Order Items'

admin.site.register(Order,OrderAdmin)        
