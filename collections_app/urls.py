from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .controllers import collection_controller, controllers, ListOfCollections, user_controller

# /api/collection/
urlpatterns = [
    path('userlist/', ListOfCollections.ListOfCollections.as_view(), name="listUsersCollections"),
    path('save/', collection_controller.CollectionController.as_view(), name="collection_controller"),
    path('edit/<int:collectionId>/', collection_controller.CollectionController.as_view(), name="updateCollection"),
    path('<int:collectionId>/', collection_controller.CollectionController.as_view(), name="collectionDetailView"),
    path('<int:collectionId>/<int:contentId>/', collection_controller.CollectionController.as_view(), name="collectionDetailView"),
    path('users/', user_controller.UserList.as_view()),
    path('users/<int:pk>/', user_controller.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)