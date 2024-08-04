from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from CategoryAndSubcategory.models import *
from CategoryAndSubcategory.serializers import *
from urllib.parse import unquote
# Create your views here.

class allProductsView(APIView):
    def get(self,request,format=None):
        allProductData = Product.objects.all()
        serializer = ProductSerializer(allProductData,many=True)
        return Response(serializer.data)
    

class SingleProductView(APIView):
    def get(self, request, name, format=None):
        print(f"Encoded name received: {name}")
        decoded_name = unquote(name).replace('~', '/')
        print(f"Decoded name: {decoded_name}")
        try:
            singleProductData = Product.objects.get(name=decoded_name)
            singleProdSerializer = ProductSerializer(singleProductData)
            return Response(singleProdSerializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


# Home Page Product View

# Monitor Stand Category Start**
    
class SingleAndDualProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Monitor Stand')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Single Arms', 'Dual Arms'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer
      
class TripleQuadLapTvProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Monitor Stand')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Triple Arm','Quad Arm','Laptop Stand','Tv-Speaker stand-Monitor Riser'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer
      

class VesaMountAdapterProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Monitor Stand')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Vesa Mount Adapter'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer

# Monitor Stand Category End 
      

#Home And Decor Category Start

class HomeDecorAllProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Home & Decor')
        products = Product.objects.filter(Category=category)
        return products

      def get_serializer_class(self):
            return ProductSerializer


class WallShelfProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Home & Decor')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Wall Shelf'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer
      
class FlowerStandProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Home & Decor')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Flower Stand'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer      
      

class FloorLempProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Home & Decor')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Floor Lamp'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer      
      

class TableLempProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Home & Decor')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Table Lamp'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer      
# Home and Decor Category end
      
#Categories Section Start


class KitchenwareProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Kitchenware')
        products = Product.objects.filter(Category=category)
        return products

      def get_serializer_class(self):
            return ProductSerializer    

class FurnitureProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Furniture')
        products = Product.objects.filter(Category=category)
        return products

      def get_serializer_class(self):
            return ProductSerializer    

class SwingsProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Furniture')
        sub_categories = SubCategory.objects.filter(subcatname__in=['Swings'])
        products = Product.objects.filter(Category=category, Sub_category__in=sub_categories)
        return products

      def get_serializer_class(self):
            return ProductSerializer    

class CncProductListView(generics.ListAPIView):
      def get_queryset(self):
        category = Category.objects.get(catname='Crafts')
        products = Product.objects.filter(Category=category)
        return products

      def get_serializer_class(self):
            return ProductSerializer 

#Categories Section End

#Quick View 

class QuickViewProductView(APIView):
    def get(self, request, *args, **kwargs):
        quickviewId = kwargs.get('id')
        product = get_object_or_404(Product, id=quickviewId)
        quickViewSerializer = ProductSerializer(product)
        return Response(quickViewSerializer.data, status=status.HTTP_200_OK)