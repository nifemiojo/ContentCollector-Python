from django.views.generic import TemplateView
from django.urls import path

from .views import index

app_name = 'frontend'
urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name=''),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html')),
    path('reset-password/', TemplateView.as_view(template_name='index.html')),
    path('<str:username>/', TemplateView.as_view(template_name='index.html')),
    path('<str:username>/<int:collectionId>/', TemplateView.as_view(template_name='index.html')),
    path('collections/', TemplateView.as_view(template_name='index.html')),
    path('collections/new/', TemplateView.as_view(template_name='index.html')),
    path('collections/<int:collectionId>/', TemplateView.as_view(template_name='index.html')),
    path('new/', TemplateView.as_view(template_name='index.html'))
]