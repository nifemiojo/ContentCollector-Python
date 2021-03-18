from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

# /api/collections/<int:collectionId>/content/
urlpatterns = [
    path('', function), # List all content in collection 
    path('create/', function), # Create new content (POST) 
    path('<int:collectionId>/<int:contentId>/save/', function), # Save an edited content (PUT)
    path('<int:collectionId>/<int:contentId>/delete/', function), # Delete selected content
]

urlpatterns = format_suffix_patterns(urlpatterns)
