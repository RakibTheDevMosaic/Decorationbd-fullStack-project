from django.db import models

# Create your models here.
class Slider(models.Model):
    name = models.CharField(max_length=100)
    img = models.ImageField(upload_to='sliderImg/',default=None)
    def __str__(self):
        return self.name