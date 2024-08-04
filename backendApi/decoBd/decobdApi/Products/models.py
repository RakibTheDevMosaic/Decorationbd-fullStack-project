from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from CategoryAndSubcategory.models import *
# Create your models here.

STOCK_STATUS = (
    ("In Stock","In Stock"),
    ("On Sale", "On Sale"),
)

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    discount_price = models.DecimalField(decimal_places=2, max_digits=10)
    description = RichTextUploadingField()
    Category = models.ForeignKey(Category, on_delete=models.CASCADE)
    Sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    tags = models.CharField(max_length=100)
    stock = models.CharField(choices=STOCK_STATUS,max_length=100)
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_imgs')    
    images = models.ImageField(upload_to='products/')
    def __str__(self):
        return self.product.name