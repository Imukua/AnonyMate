from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from datetime import date, timedelta
from django.utils import timezone
class AppUserManager(BaseUserManager):
	def create_user(self, username, password=None):
		if not username:
			raise ValueError('A username is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.model(username=username)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, username, password=None):
		if not username:
			raise ValueError('A username is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(username=username, password=password)
		user.is_superuser = True
		user.is_staff = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	username = models.CharField(max_length=50, unique=True)
	likes = models.JSONField(null=True, blank=True)
	mood = models.CharField(max_length=30, blank=True) 
	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = []
	objects = AppUserManager()
	is_staff = models.BooleanField(default=False)
	login_streak = models.IntegerField(default=0)  # To store the login streak count
	last_login_date = models.DateField(null=True, blank=True)
	

	@property
	def id(self):
		return self.user_id

	def __str__(self):
		return self.username

	def update_login_streak(self):
		# Get the current date
		today = date.today()

		if self.last_login_date is None:
			# First login, initialize the streak
			self.login_streak = 1
		else:
			# Calculate the difference in days between the last login date and today
			days_difference = (today - self.last_login_date).days

			if days_difference == 1:
				# The user logged in on consecutive days
				self.login_streak += 1
			elif days_difference > 1:
				# The user skipped a day or logged in on a future date, reset the streak
				self.login_streak = 1

		# Update the last login date
		self.last_login_date = today

		# Save the user model
		self.save()

		return self.login_streak