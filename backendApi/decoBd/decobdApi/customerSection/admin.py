from django.contrib import admin
from .models import *
# Register your models here.

class CustomerShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'email', 'address', 'city')


admin.site.register(CustomerShippingAddress, CustomerShippingAddressAdmin)


class CustomerBillingAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'email', 'address', 'city')


admin.site.register(CustomerBillingAddress, CustomerBillingAddressAdmin)
