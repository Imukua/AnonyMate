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
	authentication_classes= [JWTAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	def post(self, request):
		user_id=request.user.id 
		try:
			user = get_user_model().objects.get(user_id=user_id)
		except get_user_model().DoesNotExist:
			return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
		user.update_login_streak()
		serializer = UserSerializer(user)
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
	authentication_classes = [JWTAuthentication]
	permission_classes = (permissions.IsAuthenticated,)
	accepted_fields = ['username', 'gender', 'mood', 'likes']
	##
	def get(self, request, user_id):
		if request.user.id == user_id:
			try:
				user = get_user_model().objects.get(user_id=user_id)
				serializer = UserSerializer(user)
				return Response({'user': serializer.data}, status=status.HTTP_200_OK)
			except get_user_model().DoesNotExist:
				return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
		else:
			return Response({'error': 'Unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
	def put(self, request, user_id):
		if request.user.id != user_id:
			return Response({'error': 'Unauthorized.'}, status=status.HTTP_401_UNAUTHORIZED)
		user = get_user_model().objects.get(user_id=user_id)

		fields_to_update = {}

		# Iterate through request data and update accepted fields
		for field in self.accepted_fields:
			if field in request.data:
				# Special handling for the 'likes' field
				if field == 'likes':
					# Assuming 'likes' in request data is a list or dictionary
					new_likes = request.data.get('likes')

					# Merge new likes with existing ones (if any)
					existing_likes = user.likes
					if isinstance(existing_likes, list):
						# Assuming 'likes' is a list
						user.likes = existing_likes + new_likes
					elif isinstance(existing_likes, dict):
						# Assuming 'likes' is a dictionary
						existing_likes.update(new_likes)
						user.likes = existing_likes
				else:
					setattr(user, field, request.data[field])
				fields_to_update[field] = request.data[field]

		user.save()
		serializer = UserSerializer(user)
		return Response({'user': serializer.data, 'message': 'User profile updated successfully.', 'updated_fields': fields_to_update}, status=status.HTTP_200_OK)

class HomeView(APIView):
	authentication_classes = [JWTAuthentication]
	permission_classes = (permissions.IsAuthenticated,)
	def get(self, request):
		content = {'message': 'Welcome to the JWT ' 
			 'Authentication page using React Js and Django!'}
		return Response(content)
