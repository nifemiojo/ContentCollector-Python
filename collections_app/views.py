from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Content, Collection
def homeView(request):
    return render(request, "layout/home.html", context={}, status=200)

def contentListView(request):
    """
    REST API View
    """
    collections = Collection.objects.all()
    collectionsList = [{
        "id": x.id, 
        "name": x.name, 
        "categories": [y.name for y in x.categories.all()],
        "contents": [y.title for y in x.contents.all()],
        "privacy": x.privacyLevel
    } for x in collections]

    data = {
        "response": collectionsList
    }
    return JsonResponse(data)

def collectionView(request, collectionId):
    """
    REST API View
    """
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
    """
    REST API View
    """
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