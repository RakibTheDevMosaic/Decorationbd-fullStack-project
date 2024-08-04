from django.db import models
from Users.models import User

# Create your models here.
class CustomerShippingAddress(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=255,unique=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    customization = models.CharField(max_length=100,blank=True,null=True)
    country = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.zip_code}, {self.address}, {self.city}, {self.country}"
    

class CustomerBillingAddress(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=255,unique=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    customization = models.CharField(max_length=100,blank=True,null=True)
    country = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.zip_code}, {self.address}, {self.city}, {self.country}"
