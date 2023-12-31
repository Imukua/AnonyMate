from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import SupportGroups, Membership
from user_api.serializers import UserSerializer
from user_api.models import AppUser
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


class UserMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Membership
        fields = '__all__'
class MembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    support_group = SupportGroupSerializer()
    class Meta:
        model = Membership
        fields = '__all__'
class MembershipSerializerHome(serializers.ModelSerializer):
    group_name = serializers.CharField(source='support_group.group_name')
    group_description = serializers.CharField(source='support_group.group_description')

    class Meta:
        model = Membership
        fields = ('group_name', 'group_description')