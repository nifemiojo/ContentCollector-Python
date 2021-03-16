from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..serializers import CollectionSerializer
from ..models import Collection


class CollectionController(APIView):
    """
    Class handles the saving or updating of Collection resources.
    """

    def get(self, request, collectionId, format=None):
        collection = Collection.objects.get(id=collectionId)
        serializer = CollectionSerializer(collection)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = request.user
        serializer = CollectionSerializer(data=request.data)

        # Check Data in post request is valid
        if serializer.is_valid() and user:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, collectionId):
        # TODO Make sure only the user who owns collection is editing it
        collection = Collection.objects.get(id=collectionId)
        serializer = CollectionSerializer(collection, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, collectionId):
        collection = Collection.objects.get(id=collectionId)
        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)