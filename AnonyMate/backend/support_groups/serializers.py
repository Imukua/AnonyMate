from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import SupportGroups, UserSupportGroup
from user_api.serializers import UserSerializer
class SupportGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportGroups
        fields = ['group_id','group_name', 'group_description']

    def create_group(self, validated_data):
        # Check if a group with the same name already exists
        group_name = validated_data.get('group_name')
        existing_group = SupportGroups.objects.filter(group_name=group_name).first()

        if existing_group:
            raise ValidationError("A group with the same name already exists.")

        # Create the group and set the moderator
        group = SupportGroups.objects.create(group_name=group_name, group_description=validated_data['group_description'])
        group.save()
        return group

class UserSupportGroupSerializer(serializers.ModelSerializer):
    user = UserSerializer() 
    class Meta:
        model = UserSupportGroup
        fields = '__all__'