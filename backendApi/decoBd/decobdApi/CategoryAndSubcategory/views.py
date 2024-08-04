from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .serializers import *
from .models import *
# Create your views here.

class allCategoryView(generics.RetrieveAPIView):
    def get(self,request,format=None):
        catData = Category.objects.all()
        serializer = CategorySerializer(catData,many=True)
        return Response(serializer.data)

class singleCategoryView(APIView):
    def get(self,request,catname,format=None):
        singleCatData = get_object_or_404(Category, catname=catname)
        singleSerializer = CategorySerializer(singleCatData)
        return Response(singleSerializer.data)


class allSubCategoryView(APIView):
    def get(self,request,format=None):
        subCatData = SubCategory.objects.all()
        serializerSubcat = SubCategorySerializer(subCatData,many=True)
        return Response(serializerSubcat.data)
    
class singleSubCategoryView(APIView):
    def get(self,request,subcatname,format=None):
        singleSubCatData = get_object_or_404(SubCategory, subcatname=subcatname)
        SingleserializerSubCatData = SubCategorySerializer(singleSubCatData)
        return  Response(SingleserializerSubCatData.data)  