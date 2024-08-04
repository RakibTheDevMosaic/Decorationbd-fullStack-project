from rest_framework import serializers
from .models import Category, SubCategory


class SubCategorySerializer(serializers.ModelSerializer):
  

    class Meta:
        model = SubCategory
        fields = ['id', 'subcatname']




class CategorySerializer(serializers.ModelSerializer):
    sub_categories = SubCategorySerializer(many=True)
    class Meta:
        model = Category
        fields = ['id', 'catname','sub_categories']