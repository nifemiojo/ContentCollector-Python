""" from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Content, Collection
from .forms import CollectionForm
from .serializers import CollectionSerializer, CreateCollectionSerializer

class AllCollections(generics.ListAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    


def collectionView(request, collectionId):
    data = {
        "id": collectionId,
    }
    status = 200

    try:
        content = Content.objects.get(id=collectionId)
        data["title"] = content.title
        data["description"] = content.description
        data["link"] = content.link
        # Get content by id
    except:
        data['message'] = "Not found"
        status = 404
 
    return JsonResponse(data, status=status)

def contentView(request, collectionId, contentId):

    data = {
        "id": contentId,
    }
    status = 200

    try:
        content = Content.objects.get(id=contentId)
        data["title"] = content.title
        data["description"] = content.description
        data["link"] = content.link
        # Get content by id
    except:
        data['message'] = "Not found"
        status = 404
 
    return JsonResponse(data, status=status)
 """