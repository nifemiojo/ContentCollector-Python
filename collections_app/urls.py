from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .controllers import SaveCollection, controllers, ListOfCollections

# /api/collection/
urlpatterns = [
    path('userList/', ListOfCollections.ListOfCollections.as_view(), name="listUserCollections"),
    path('save/', SaveCollection.SaveCollection.as_view(), name="saveCollection"),
    path('<int:collectionId>/', SaveCollection.SaveCollection.as_view(), name="collectionDetailView"),
    path('<int:collectionId>/<int:contentId>/', SaveCollection.SaveCollection.as_view(), name="collectionDetailView"),
]

urlpatterns = format_suffix_patterns(urlpatterns)