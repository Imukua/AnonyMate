"""Defines all user models."""
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    A custom user model for AnonyMate.
    This model extends Django's built-in `AbstractUser` model to include 
    additional fields and functionality specific to AnonyMate.

    Attributes:
        password -> The users password.
        username -> The users nickname. 
    """
    MOODS = [
        ('Happy', 'Happy'),
        ('Sad', 'Sad'),
        ('Suicidal', 'Suicidal'),
        ('Relaxed', 'Relaxed'),
    ]

    LIKES = [
        ('Anime', 'Anime'),
        ('Books', 'Books'),
        ('Movies', 'Movies'),
    ]

    username = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=12)
    streak =   models.PositiveIntegerField(default=0)
    mood = models.CharField(max_length=30, choices=MOODS, blank=True)
    likes = models.CharField(max_length=30, choices=LIKES, blank=True)
    registration_date = models.DateTimeField(auto_now_add=True)

    def signup(self, username, password):
        """
        Creates a new user with the given username and password.
        
        Args:
        - username (str): The desired username for the new user.
        - password (str): The desired password for the new user.
        """
        self.username = username
        self.set_password(password)
        self.save()

    def __str__(self):
        """
        Returns a string representation of the user object.
        """
        return self.username
