from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .models import SupportGroups

def validate_group_name(data):
    group_name = data['group_name'].strip()
    existing_group = SupportGroups.objects.filter(group_name=group_name).first()
    if existing_group or len(group_name) < 8:
        raise ValidationError('choose another name, min 8 characters')
    if not group_name:
        raise ValidationError('choose another groupname')
    return True

def validate_group_description(data):
    group_description = data['password'].strip()
    if not group_description:
        raise ValidationError('a description is needed')
    return True