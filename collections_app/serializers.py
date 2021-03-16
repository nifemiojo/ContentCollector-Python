from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Collection


# Translates model to JSON response either incoming or outgoing
# Serialize a response. Ensures correct format
# Ensures data from post req is valid
class CollectionSerializer(serializers.ModelSerializer):
    class Meta():
        model = Collection
        # Takes data from req, fields expected in POST req
        fields = ['id', 'name', 'description', 'privacyLevel']

class UserSerializer(serializers.ModelSerializer):
    collections = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'collections']
  