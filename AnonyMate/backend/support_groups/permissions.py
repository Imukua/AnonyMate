"""from rest_framework import permissions
from models import UserSupportGroup

class IsModeratorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is a moderator
        group_id = request.data['group_id']
        user_id = request.data['user_id']
        queryset = UserSupportGroup.objects.filter(group_id=group_id, user=user_id)
        return request.user.is_moderator
"""