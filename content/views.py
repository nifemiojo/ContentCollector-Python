from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Content 
def homeView(request):
    return render(request, "layout/home.html", context={}, status=200)

def contentListView(request, *args):
    """
    REST API View
    """
    cnt = Content.objects.all()
    cntList = [{"id": x.id, "title": x.title} for x in cnt]
    data = {
        "response": cntList
    }
    return JsonResponse(data)

def contentView(request, contentId):
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