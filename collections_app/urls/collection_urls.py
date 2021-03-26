from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from ..controllers import collection_detail, collection_list

# /api/collections/
urlpatterns = [
    path('', collection_list.FullCollectionList.as_view()), # List all of current users collections
    path('public/<str:username>/', collection_list.PublicCollectionList.as_view()), # List all public collections for specific user
    path('create/', collection_detail.CollectionDetail.as_view()), # Create new collection (POST) 
    path('<int:collectionId>/save/', collection_detail.CollectionDetail.as_view()), # Save an edited collection (PUT)
    path('<int:collectionId>/delete/', collection_detail.CollectionDetail.as_view()), # Delete selected collection
    path('<int:collectionId>/content/', include('collections_app.urls.content_urls')), # Delete selected collection
    path('<int:collectionId>/', collection_detail.CollectionDetail.as_view()), # Get an individual collection
]
urlpatterns = format_suffix_patterns(urlpatterns)