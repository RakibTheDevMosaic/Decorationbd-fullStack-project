from django.db import models

# Create your models here.    
class SubCategory(models.Model):
    id = models.AutoField(auto_created=True,primary_key=True,serialize=False,verbose_name='ID')
    subcatname = models.CharField(max_length=100)

    def __str__(self):
        return self.subcatname   
    
class Category(models.Model):
    id = models.AutoField(auto_created=True,primary_key=True,serialize=False,verbose_name='ID')
    catname = models.CharField(max_length=100)
    sub_categories = models.ManyToManyField(SubCategory, related_name='categories')

    def __str__(self):
        return self.catname  