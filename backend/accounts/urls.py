from django.urls import path, include
from .views import (
    UserListView, UserDetailView, CurrentUserView
)

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<uuid:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('me/', CurrentUserView.as_view(), name='user-detail'),
]