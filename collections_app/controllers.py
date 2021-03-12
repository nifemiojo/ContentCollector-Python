from django.shortcuts import render
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

class CreateCollection(APIView):
    serializer_class = CreateCollectionSerializer

    def post(self, request, format=None):
        user = request.user
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        # Check Data in post request is valid
        if serializer.is_valid() and user:
            name = serializer.data.get("name")
            description = serializer.data.get("description") 
            tags = serializer.data.get("tags")
            contents = serializer.data.get("contents")
            collections = serializer.data.get("collections")
            privacyLevel = serializer.data.get("privacyLevel")

            collection = Collection.objects.create(name=name, description=description, 
                privacyLevel=privacyLevel, user=user)
            collection.tags.set(tags)
            collection.contents.set(contents)
            collection.collections.set(collections)
            return Response(CollectionSerializer(collection).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

        # Handle authentication
        user = request.User
        if not request.user.is_authenticated:
            user = None
            return JsonResponse({}, status=401)

        form = CollectionForm(request.POST or None)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.save()
            form = CollectionForm()
        return render(request, 'components/form.html', context={"form": form})
    
def contentListView(request):
    """
    REST API View
    """
    user = request.User.id
    print(user)
    collections = Collection.objects.all()
    collectionsList = [{
        "id": x.id, 
        "name": x.name, 
        "tags": [y.name for y in x.tags.all()],
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
