from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..serializers import CollectionSerializer 
from ..models import Collection
from authentication.models import User

class FullCollectionList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        REST API View
        Returns complete list of users collections upon GET request
        Can only be accessed by the user who owns this list
        """
        user = request.user
        userCollections = Collection.objects.filter(user=user)
        serializedListOfUsersCollections = CollectionSerializer(userCollections, many=True)
        return Response(serializedListOfUsersCollections.data, status=status.HTTP_200_OK)

class PublicCollectionList(APIView):

    def get(self, request, username):
        """
        REST API View
        Returns list of a users PUBLIC collections upon GET request
        Read only view for all authenticated and non-authenticated users
        """
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist: 
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
     
        userCollections = Collection.objects.filter(user=user, privacyLevel="Public")
        serializedListOfUsersCollections = CollectionSerializer(userCollections, many=True)
        return Response(serializedListOfUsersCollections.data, status=status.HTTP_200_OK)
        