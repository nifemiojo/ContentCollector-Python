from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from ..controllers import content

# /api/collections/<int:collectionId>/content/
urlpatterns = [ 
    path('', content.ContentList.as_view()), # List all content in collection 
    path('create/', content.CreateContent.as_view()), # Create new content (POST) 
    path('<int:contentId>/save/', content.EditContent.as_view()), # Save an edited content (PUT)
    path('<int:contentId>/delete/', content.DeleteContent.as_view()), # Delete selected content
]