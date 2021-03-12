from django.urls import path

from . import controllers

# /collectionTest
urlpatterns = [
    path('save/', controllers.CreateCollection.as_view(), name="createCollection"),
    path('<int:collectionId>/', controllers.collectionView, name="collectionDetailView"),
    path('<int:collectionId>/<int:contentId>/', controllers.contentView, name="collectionDetailView"),
    path('', controllers.AllCollections.as_view(), name="collectionDetailView"),
]