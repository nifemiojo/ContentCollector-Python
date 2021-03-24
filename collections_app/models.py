from django.db import models
from django.conf import settings
from authentication.models import User

class Tag(models.Model):
    name = models.CharField(max_length=50)

class Collection(models.Model):
    PRIVACY_CHOICES = models.TextChoices("PRIVACY_CHOICES", "Public Private Personal")

    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    tags = models.ManyToManyField(Tag, verbose_name="list of tags", blank=True)
    collections = models.ManyToManyField('self', verbose_name="list of collections", blank=True)
    privacyLevel = models.CharField("privacy level", choices=PRIVACY_CHOICES.choices, max_length=15)
    user = models.ForeignKey(User, related_name='collections', on_delete=models.CASCADE)
    # createdAt = models.DateTimeField(auto_now_add=True)

class Content(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    link = models.URLField(blank=True)
    collection = models.ForeignKey(Collection, related_name='contents', on_delete=models.CASCADE)