from django import forms

from .models import Collection

class CollectionForm(forms.ModelForm):
    class Meta:
        model = Collection
        fields = ['name', 'description', 'categories', 'contents', 'privacyLevel']