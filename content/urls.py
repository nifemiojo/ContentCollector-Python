from django.urls import path

from . import views
# /content
urlpatterns = [
    path('', views.homeView, name="homeView"),
    path('all/', views.contentListView, name="listView"),
    path('<int:contentId>/', views.contentView, name="contentDetailView"),
]