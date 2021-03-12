from django.views.generic import TemplateView
from django.urls import path

from .views import index

app_name = 'frontend'
urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name=''),
    path('login', TemplateView.as_view(template_name='index.html')),
    path('register', TemplateView.as_view(template_name='index.html')),
    path('feed', TemplateView.as_view(template_name='index.html')),
    path('collection/create', TemplateView.as_view(template_name='index.html'))
]