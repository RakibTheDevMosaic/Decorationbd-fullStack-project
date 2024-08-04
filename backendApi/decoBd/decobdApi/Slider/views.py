from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
# Create your views here.

class SliderImageView(APIView):
    def get(self,format=None):
        sliderImg = Slider.objects.all()
        sliderSerializer= SliderSerializer(sliderImg,many=True)
        return Response(sliderSerializer.data)