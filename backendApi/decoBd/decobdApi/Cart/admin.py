from django.contrib import admin
from .models import Cart
# Register your models here.
class CartAdmin(admin.ModelAdmin):
    list_display = ('id','user','products','quantity')

admin.site.register(Cart,CartAdmin)    