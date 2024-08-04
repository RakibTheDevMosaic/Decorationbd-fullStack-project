from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
# Create your views here.

class BannerImageView(APIView):
    def get(self,format=None):
        bannerImg = Banner.objects.all()
        bannerSerializer= BannerSerializer(bannerImg,many=True)
        return Response(bannerSerializer.data)