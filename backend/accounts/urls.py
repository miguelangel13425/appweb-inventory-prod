from django.urls import path, include
from accounts.views.student_views import StudentListView, StudentDetailView
from accounts.views.provider_views import ProviderListView, ProviderDetailView
from accounts.views.user_views import UserListView, UserDetailView, CurrentUserView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<uuid:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('me/', CurrentUserView.as_view(), name='user-detail'),

    path('students/', StudentListView.as_view(), name='student-list'),
    path('students/<uuid:pk>/', StudentDetailView.as_view(), name='student-detail'),

    path('providers/', ProviderListView.as_view(), name='provider-list'),
    path('providers/<uuid:pk>/', ProviderDetailView.as_view(), name='provider-detail'),
]