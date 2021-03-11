from django.urls import path

from . import controllers

# /collection
urlpatterns = [
    path('save/', controllers.createCollection, name="createCollection"),
    path('<int:collectionId>/', controllers.collectionView, name="collectionDetailView"),
    path('<int:collectionId>/<int:contentId>/', controllers.contentView, name="collectionDetailView"),
]