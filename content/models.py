from django.db import models

# Create your models here.
class Content(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    image = models.ImageField(upload_to="./images", blank=True, null=True)
    link = models.URLField(blank=True)