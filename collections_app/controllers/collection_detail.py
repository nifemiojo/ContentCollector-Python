from rest_framework import status, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from ..serializers import CollectionSerializer
from ..models import Collection

class RestrictPrivateOwnerEdit(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Ensures only the owner can view private items
    """
    message = "Access is restricted"

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method == permissions.SAFE_METHODS and obj.user.id != request.user.id and obj.privacyLevel == "Private":
            return False
        if request.method not in permissions.SAFE_METHODS and obj.user.id != request.user.id:
            return False

        return True

class GetEditDelCollection(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: An individual collections detail
    If collection is private then user id must match collection Id
    """
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [RestrictPrivateOwnerEdit]

    def get_object(self):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        self.check_object_permissions(self.request, collection)
        """ if self.request.method == 'GET' and collection.user.id != self.request.user.id and collection.privacyLevel == "Private":
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)
        elif self.request.method != 'GET' and collection.user.id != self.request.user.id:
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN) """
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