from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..serializers import CollectionSerializer
from ..models import Collection


class CollectionDetail(APIView):
    """
    Class handles the creating, saving, updating and deleting of Collection resources.
    """

    def get(self, request, collectionId, format=None): 
        """
        Returns an individual collection
        """
        user = request.user
        collection = Collection.objects.get(id=collectionId)

        if collection.user.id != user.id and collection.privacyLevel == "Private":
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)

        serializer = CollectionSerializer(collection)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Auth users only
        """
        user = request.user
        serializer = CollectionSerializer(data=request.data)

        # Check Data in post request is valid
        if serializer.is_valid() and user:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, collectionId):
        user = request.user
        collection = Collection.objects.get(id=collectionId)

        if collection.user.id != user.id:
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = CollectionSerializer(collection, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, collectionId):
        collection = Collection.objects.get(id=collectionId)
        user = request.user

        if collection.user.id != user.id:
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)

        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)