from django.db import models

class Content(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    image = models.ImageField(upload_to="./images", blank=True, null=True)
    link = models.URLField(blank=True)

# TODO change to tag
class Category(models.Model):
    name = models.CharField(max_length=50)

class Collection(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    categories = models.ManyToManyField(Category, verbose_name="list of categories", blank=True)
    contents = models.ManyToManyField(Content, verbose_name="list of content", blank=True)
    collections = models.ManyToManyField('self', verbose_name="list of collections", blank=True)
    PRIVACY_CHOICES = models.TextChoices("PRIVACY_CHOICES", "Public Private Personal")
    privacyLevel = models.CharField("privacy level", choices=PRIVACY_CHOICES.choices, max_length=15)