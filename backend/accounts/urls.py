from django.urls import path, include
from accounts.views.student_views import StudentListView, StudentDetailView, StudentOptionView
from accounts.views.provider_views import ProviderListView, ProviderDetailView, ProviderOptionView
from accounts.views.user_views import UserListView, UserDetailView, CurrentUserView
from accounts.views.profile_views import ProfileListView, ProfileDetailView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<uuid:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('me/', CurrentUserView.as_view(), name='user-detail'),

    path('profiles/', ProfileListView.as_view(), name='profile-list'),
    path('profiles/<uuid:pk>/', ProfileDetailView.as_view(), name='profile-detail'),

    path('students/', StudentListView.as_view(), name='student-list'),
    path('students/<uuid:pk>/', StudentDetailView.as_view(), name='student-detail'),
    path('students/options/', StudentOptionView.as_view(), name='student-options'),

    path('providers/', ProviderListView.as_view(), name='provider-list'),
    path('providers/<uuid:pk>/', ProviderDetailView.as_view(), name='provider-detail'),
    path('providers/options/', ProviderOptionView.as_view(), name='provider-options'),
]