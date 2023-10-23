from django.urls import path
from . import views

urlpatterns = [
	path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', views.UserLogin.as_view(), name='login'),
	path('logout/', views.UserLogout.as_view(), name='logout'),
	path('user/<int:user_id>', views.UserView.as_view(), name='user'),
	path('user/<int:user_id>/update', views.UserView.as_view(), name='user-update'),
    path('home/', views.HomeView.as_view(), name ='home')
]
