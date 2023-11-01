from django.urls import re_path
from .consumers import GroupChatConsumer


websocket_urlpatterns = [
    re_path(r'^ws/(?P<room_name>[^/]+)/$', GroupChatConsumer.as_asgi()),
]
