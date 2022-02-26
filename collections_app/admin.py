from django.contrib import admin

from .models import Collection, Content

# Register models for admin site.
admin.site.register(Collection)
admin.site.register(Content)
