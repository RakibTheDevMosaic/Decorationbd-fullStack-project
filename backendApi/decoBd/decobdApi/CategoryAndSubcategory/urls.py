from django.urls import path
from .views import *
urlpatterns = [
    path('categories/', allCategoryView.as_view(), name='allcategory'),
    path('categories/<str:catname>', singleCategoryView.as_view(), name='singlecategory'),
    path('subcategories/', allSubCategoryView.as_view(), name='allSubcategory'),
    path('subcategories/<str:subcatname>', singleSubCategoryView.as_view(), name='singleSubcategory'),
]