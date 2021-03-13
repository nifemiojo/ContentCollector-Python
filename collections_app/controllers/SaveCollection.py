from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..serializers import CreateCollectionSerializer


class SaveCollection(APIView):
    """
    Class handles the saving or updating of Collection resources.
    """
    serializerClass = CreateCollectionSerializer

    def post(self, request, format=None):
        user = request.user
        serializer = self.serializerClass(data=request.data)

        # Check Data in post request is valid
        if serializer.is_valid() and user:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)