# urls.py
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("cartitems",views.CartViewSet)
urlpatterns = [
    path('', include(router.urls)),
]