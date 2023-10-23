from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_password, validate_username
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
import traceback  # Import the traceback module
class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	##
	def post(self, request):
		data = request.data
		assert validate_username(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	authentication_classes = [JWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
			refresh_token = request.data.get("refresh_token")
			if refresh_token:
				try:
					token = RefreshToken(refresh_token)
					token.blacklist()
					return Response({"message": "Logged out succesfully."}, status=status.HTTP_205_RESET_CONTENT)
				except Exception:
					traceback.print_exc()
					return Response({"error": "Unable to log out. Please check your token."}, status=status.HTTP_400_BAD_REQUEST)

			return Response({"error": "No refresh token provided."}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class HomeView(APIView):
	authentication_classes = [JWTAuthentication]
	permission_classes = (permissions.IsAuthenticated,)
	def get(self, request):
		content = {'message': 'Welcome to the JWT ' 
			 'Authentication page using React Js and Django!'}
		return Response(content)
