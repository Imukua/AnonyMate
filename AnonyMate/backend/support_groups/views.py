from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SupportGroupSerializer, MembershipSerializer, UserMembershipSerializer
from .models import SupportGroups, Membership
from rest_framework import permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .validations import validate_description, validate_name

class CreateGroup(APIView):
    queryset = SupportGroups.objects.all()
    serializer_class = SupportGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]


    def post(self, request):
        clean_data = request.data
        if not validate_name or not validate_description:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = SupportGroupSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            support_group = serializer.create_group(clean_data)
        if support_group:
            usergroup=Membership.objects.create(
                user=request.user,
                support_group=support_group,
                is_moderator=True,
            )
            usergroup.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)



class JoinGroupView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MembershipSerializer
    authentication_classes = [JWTAuthentication]

    def post(self, request, group_id):
        try:
            group = SupportGroups.objects.get(group_id=group_id)
        except SupportGroups.DoesNotExist:
            return Response({"detail":"Support group not found"}, status=status.HTTP_404_NOT_FOUND)
        user_id = request.user.id 
        if Membership.objects.filter(user__user_id=user_id, support_group__group_id=group_id):
            return Response({"Detail":"User already member of the group"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            newrecord=Membership.objects.create(
                user = request.user,
                support_group = group)
            newrecord.save()
            return Response({"Detail":"User joined group successfully"}, status=status.HTTP_201_CREATED)           

class ListGroupsView(APIView):
    serializer_class = SupportGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, group_id=None):
        queryset = SupportGroups.objects.all()
        serializer = SupportGroupSerializer(queryset, many=True)
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Support groups not found."}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, group_id=None):
        queryset = SupportGroups.objects.get(group_id=group_id)
        serializer = SupportGroupSerializer(queryset)
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Support group not found."}, status=status.HTTP_400_BAD_REQUEST) 


class GroupMembersListView(APIView):
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, group_id=None):
        user_id = request.query_params.get('user_id')
        group_id1 = request.query_params.get('group_id')
        if group_id1:
            queryset = Membership.objects.filter(support_group__group_id=group_id)
            serializer = MembershipSerializer(queryset, many=True)
        elif user_id:
            user_id=request.user.id
            queryset = Membership.objects.filter(user__user_id=user_id)
            serializer = UserMembershipSerializer(queryset, many=True)
        else:
            queryset = Membership.objects.all()
            
            serializer = MembershipSerializer(queryset, many=True)
        
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Support groups not found."}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, group_id):
        user_id = request.user.id
        is_moderator = Membership.objects.filter(user=user_id, support_group__group_id=group_id, is_moderator=True).exists()
        if is_moderator:
            if validate_description(request.data):
                group = SupportGroups.objects.get(group_id=group_id)
                group.group_description = request.data['group_description']
                group.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class ExitGroupView(APIView):
    serializer_class = SupportGroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, group_id):
        try:
            group = SupportGroups.objects.get(group_id=group_id)
        except SupportGroups.DoesNotExist:
            return Response({"detail":"Support group not found"}, status=status.HTTP_404_NOT_FOUND)
        user_id = request.user.id
        try:
            membership = Membership.objects.filter(user__user_id=user_id, support_group__group_id=group_id)
        except Membership.DoesNotExist:
            return Response({"Detail":"User is not member of the group"}, status=status.HTTP_400_BAD_REQUEST)
        membership.delete()
        remaining_members = Membership.objects.filter(support_group = group)
        if not remaining_members:
            group.delete()
            return Response({"Detail":"User left group and group deleted successfully"}, status=status.HTTP_200_OK)           
        return Response({"Detail":"User left group successfully"}, status=status.HTTP_200_OK)           
