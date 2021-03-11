from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL
# Superuser: test test

class Content(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    image = models.ImageField(upload_to="./images", blank=True, null=True)
    link = models.URLField(blank=True)

# TODO change to tag
class Tag(models.Model):
    name = models.CharField(max_length=50)

class Collection(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    tags = models.ManyToManyField(Tag, verbose_name="list of tags", blank=True)
    contents = models.ManyToManyField(Content, verbose_name="list of content", blank=True)
    collections = models.ManyToManyField('self', verbose_name="list of collections", blank=True)
    PRIVACY_CHOICES = models.TextChoices("PRIVACY_CHOICES", "Public Private Personal")
    privacyLevel = models.CharField("privacy level", choices=PRIVACY_CHOICES.choices, max_length=15)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # createdAt = models.DateTimeField(auto_now_add=True)