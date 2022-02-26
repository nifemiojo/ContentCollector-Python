from rest_framework import serializers
from .models import Collection, Content


# Translates model to JSON response either incoming or outgoing
# Serialize a response. Ensures correct format
# Ensures data from post req is valid
class CollectionSerializer(serializers.ModelSerializer):
    class Meta():
        model = Collection
        fields = ['id', 'name', 'description', 'privacyLevel']

class ContentSerializer(serializers.ModelSerializer):
    class Meta():
        model = Content
        fields = ['id', 'title','description', 'link']