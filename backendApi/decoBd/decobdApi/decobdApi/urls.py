from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('Users.urls')),
    path('api/',include('CategoryAndSubcategory.urls')),
    path('api/',include('Products.urls')),
    path('api/',include('Slider.urls')),
    path('api/',include('Banner.urls')),
    path('api/',include('customerSection.urls')),
    path('api/',include('Cart.urls')),
    path('api/',include('Orders.urls')),
    path('ckeditor/',include('ckeditor_uploader.urls'))
]  + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
