from django.contrib import admin
from .models import *
# Register your models here.

# class ProductImageAdmin(admin.StackedInline):
#     model = ProductImage

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     inlines = [ProductImageAdmin]

#     class Meta:
#         model = Product

# @admin.register(ProductImage)
# class ProductImageAdmin(admin.ModelAdmin):
#     pass          



class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ('id','name', 'discount_price', 'Category', 'Sub_category', 'stock')
    list_filter = ('Category', 'Sub_category')
    search_fields = ('name','tags')

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)