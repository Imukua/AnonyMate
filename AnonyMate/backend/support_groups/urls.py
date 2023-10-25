from django.urls import path
from . import views

urlpatterns = [
	path('create/', views.SupportGroupCreate.as_view(), name='create_group'),
    path('list/', views.SupportGroupListView.as_view(), name='support-group-list'),
    path('members/', views.GroupMembersListView.as_view(), name='user-support-group-list'),
    path('list/<int:group_id>/', views.SupportGroupbyIdView.as_view(), name='group-by-id'),
]
