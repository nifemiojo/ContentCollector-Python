from rest_framework import mixins
from rest_framework import generics

from ..models import Content, Collection
from ..serializers import ContentSerializer

class ContentList(generics.ListCreateAPIView):
    """
    GET: Returns array of content in a given collection
    """
    serializer_class = ContentSerializer
    def get_queryset(self):
        query = Content.objects.filter(collection=self.kwargs["collectionId"])
        return query

    def perform_create(self, serializer):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        serializer.save(collection=collection)

class ContentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Returns specific content item
    """
    serializer_class = ContentSerializer
    def get_object(self):
        obj = Content.objects.get(id=self.kwargs["contentId"])
        return obj

    def perform_update(self, serializer):
        collection = Collection.objects.get(id=self.kwargs["collectionId"])
        serializer.save(collection=collection)

    
    

