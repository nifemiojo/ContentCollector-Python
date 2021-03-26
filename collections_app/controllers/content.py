from rest_framework import mixins, generics, permissions
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

from ..models import Content, Collection
from ..serializers import ContentSerializer

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class ContentList(generics.ListCreateAPIView):
    """
    GET: Returns array of content in a given collection
    """
    serializer_class = ContentSerializer 
    queryset = Content.objects.all()
    permission_classes = [IsAuthenticated|ReadOnly]

    def get_queryset(self):
        return self.queryset.filter(collection=self.kwargs["collectionId"])

    def perform_create(self, serializer):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        serializer.save(collection=collection)

class ContentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Returns specific content item
    """
    serializer_class = ContentSerializer
    permission_classes = [IsAuthenticated|ReadOnly]

    def get_object(self):
        return Content.objects.get(id=self.kwargs["contentId"])

    def perform_update(self, serializer):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        serializer.save(collection=collection)

    
    

