from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SupportGroupSerializer, UserSupportGroupSerializer
from .models import SupportGroups, UserSupportGroup
from rest_framework import permissions, status
from .validations import validate_group_description, validate_group_name
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

class SupportGroupCreate(APIView):
    queryset = SupportGroups.objects.all()
    serializer_class = SupportGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]


    def post(self, request):
        clean_data = request.data
        if not validate_group_name or not validate_group_description:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = SupportGroupSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            support_group = serializer.create_group(clean_data)
        if support_group:
            usergroup=UserSupportGroup.objects.create(
                user=request.user,
                support_group=support_group,
                is_moderator=True,
            )
            usergroup.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class SupportGroupListView(APIView):
    serializer_class = SupportGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        queryset = SupportGroups.objects.all()
        serializer = SupportGroupSerializer(queryset, many=True)
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Support groups not found."}, status=status.HTTP_400_BAD_REQUEST) 
class GroupMembersListView(APIView):
    serializer_class = UserSupportGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        queryset = UserSupportGroup.objects.all()
        serializer = UserSupportGroupSerializer(queryset, many=True)
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Support groups not found."}, status=status.HTTP_400_BAD_REQUEST) 

class SupportGroupbyIdView(APIView):
    serializer_class = SupportGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, group_id):
        queryset = SupportGroups.objects.get(group_id=group_id)
        serializer = SupportGroupSerializer(queryset)
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Support group not found."}, status=status.HTTP_400_BAD_REQUEST)
    
    """def put(self, request, group_id):
        """
        