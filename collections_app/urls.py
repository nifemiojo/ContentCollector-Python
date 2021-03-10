from django.urls import path

from . import views
# /collection
urlpatterns = [
    # Lists all collections
    path('', views.contentListView, name="collectionList"),
    path('<int:collectionId>/', views.collectionView, name="collectionDetailView"),
    path('<int:collectionId>/<int:contentId>/', views.contentView, name="collectionDetailView"),
]