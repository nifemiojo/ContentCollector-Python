# Translates model to JSON response either incoming or outgoing
from rest_framework import serializers
from .models import Collection

# Serialize a response. Ensures correct format
class CollectionSerializer(serializers.ModelSerializer):
    class Meta():
        model = Collection
        fields = ('id', 'name', 'description', 'tags', 'contents', 
                    'collections', 'privacyLevel')

# Ensures data from post req is valid
class CreateCollectionSerializer(serializers.ModelSerializer):
    class Meta():
        model = Collection
        # Takes data from req, fields expected in POST req
        fields = ('name', 'description', 'tags', 'contents', 
                    'collections', 'privacyLevel')
  