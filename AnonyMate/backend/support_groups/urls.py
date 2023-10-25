from django.urls import path
from . import views

urlpatterns = [
	path('create/', views.SupportGroupCreate.as_view(), name='create_group'),
    path('all/list/', views.SupportGroupListView.as_view(), name='all-support-group-list'),
    path('all/members/', views.GroupMembersListView.as_view(), name='all-support-groups-and-members'),
    path('<int:group_id>/', views.SupportGroupbyIdView.as_view(), name='support-group-by-id'),
    path('<int:group_id>/members/', views.GroupMembersListView.as_view(), name='support-group-members-by-id'),
    path('<int:group_id>/update/', views.GroupMembersListView.as_view(), name='support-group-members-by-id'),
    path('', views.GroupMembersListView.as_view(), name='support-group-members-by-id'),
]
