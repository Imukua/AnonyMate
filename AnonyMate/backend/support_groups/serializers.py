from .models import SupportGroups, UserSupportGroup
from django.core.exceptions import ValidationError
from rest_framework import serializers


class CreateGroupAerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportGroups
        fields = ['group_name', 'group_description']

        def create(self, validated_data):
            return SupportGroups.objects.create(**validated_data)
