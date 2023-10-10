from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields= '__all__'

    def create(self, data):
        userobj = UserModel.objects.create_user(username=data['username'],
                                                password=data['password'])
        userobj.save()
        return userobj


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def authenticate_user(self, data):
        user = authenticate(username=data['username'], password=['password'])
        if not user:
            raise ValidationError('user not found')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model: UserModel
        fields = ('username')


