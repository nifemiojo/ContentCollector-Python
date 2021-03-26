from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..serializers import CollectionSerializer 
from ..models import Collection
from authentication.models import User

class FullCollectionList(generics.ListAPIView):
    """
    REST API View
    Returns complete list of users collections upon GET request
    Can only be accessed by the user who owns this list
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class PublicCollectionList(generics.ListAPIView):
    """
    REST API View
    Returns list of a users PUBLIC collections upon GET request
    Read only view for all authenticated and non-authenticated users
    """
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()

    def get_queryset(self):
        user = User.objects.get(username=self.kwargs["username"])
        return self.queryset.filter(user=user, privacyLevel="Public")

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
        except User.DoesNotExist: 
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return super().list(request, *args, **kwargs)
        
        