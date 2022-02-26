from rest_framework import mixins, generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..models import Content, Collection
from ..serializers import ContentSerializer

class ContentList(generics.ListAPIView):
    """
    GET: Returns array of content in a given collection
    """
    serializer_class = ContentSerializer 
    queryset = Content.objects.all()

    def get_queryset(self):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        if collection.user.id != self.request.user.id:
            return self.queryset.filter(collection=self.kwargs["collectionId"], collection__privacyLevel="Public")
        return self.queryset.filter(collection=self.kwargs["collectionId"])

class RestrictPrivateOwnerEdit(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Ensures only the owner can view private items
    """
    message = "Access is restricted"

    def has_object_permission(self, request, view, obj):
        if obj.collection.user.id != self.request.user.id:
            return False

class ContentDetail(generics.RetrieveAPIView):
    """
    GET: Returns the content in a given collection
    """
    serializer_class = ContentSerializer
    permissions_classes = [IsAuthenticated]

    def get_object(self):
        obj = Content.objects.get(id=self.kwargs["contentId"])
        self.check_object_permissions(self.request, obj)
        return obj

class CreateContent(generics.CreateAPIView):
    """
    POST: Creates Content within a collection 
    """
    serializer_class = ContentSerializer 
    permissions_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        if collection.user.id != self.request.user.id:
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer.save(collection=collection)

class EditContent(generics.UpdateAPIView):
    """
    PUT
    """ 
    serializer_class = ContentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Content.objects.get(id=self.kwargs["contentId"])

    def perform_update(self, serializer):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        if collection.user.id != self.request.user.id:
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer.save(collection=collection)

class DeleteContent(generics.DestroyAPIView):
    """
    DELETE
    """
    serializer_class = ContentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Content.objects.get(id=self.kwargs["contentId"])

    def perform_destroy(self, instance):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        if collection.user.id != self.request.user.id:
            return Response({'Bad Request': 'Unauthorized. Permission Denied'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            obj = self.get_object()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

    
    

