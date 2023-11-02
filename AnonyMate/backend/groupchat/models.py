from django.db import models
from user_api.models import AppUser
from support_groups.models import SupportGroups
# Create your models here.
class ChatMessage(models.Model):
    sender = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    group = models.ForeignKey(SupportGroups, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

