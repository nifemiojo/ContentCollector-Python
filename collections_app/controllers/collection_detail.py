from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from ..serializers import CollectionSerializer
from ..models import Collection

class GetEditDelCollection(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: An individual collections detail
    If collection is private then user id must match collection Id
    """
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_object(self):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        if self.request.method == 'GET' and collection.user.id != self.request.user.id and collection.privacyLevel == "Private":
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)
        elif self.request.method != 'GET' and collection.user.id != self.request.user.id:
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)
        return collection

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        try:
            obj = self.get_object()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreateCollection(generics.CreateAPIView):
    serializer_class = CollectionSerializer
    permissions_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)