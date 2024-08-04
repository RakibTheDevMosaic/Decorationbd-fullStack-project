from django.db import models

# Create your models here.
class Coupon(models.Model):
    code = models.CharField(max_length=50)
    discount = models.IntegerField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code