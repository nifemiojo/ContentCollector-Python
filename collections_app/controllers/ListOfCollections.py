from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..serializers import CollectionSerializer
from ..models import Collection

class ListOfCollections(APIView):

    def get(self, request):
        """
        REST API View
        Returns list of users collections upon GET request
        """
        user = request.user
        userCollections = Collection.objects.filter(user=user)
        serializedListOfUsersCollections = CollectionSerializer(userCollections, many=True)
        return Response(serializedListOfUsersCollections.data)

        