from django.db import models
from user_api.models import AppUser

# Create your models here.
class SupportGroups(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=100, unique=True)
    group_description = models.TextField()
    members = models.ManyToManyField(AppUser, related_name='support_groups', blank=True)

class UserSupportGroup(models.Model):
    support_group = models.ForeignKey(SupportGroups, on_delete=models.CASCADE)
    joined_date = models.DateTimeField(auto_now_add=True)
    is_moderator = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)