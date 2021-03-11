from django.contrib import admin

from .models import Collection, Content, Tag

# Register your models here.
admin.site.register(Collection)
admin.site.register(Content)
admin.site.register(Tag)
