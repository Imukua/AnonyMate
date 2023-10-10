from django.test import TestCase

from django.contrib.auth import get_user_model


class UserModelTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            password='testpass'
        )

    def test_create_user(self):
        """
        Test creating a new user with a username and password.
        """
        self.assertEqual(self.user.username, 'testuser')
        self.assertTrue(self.user.check_password('testpass'))

    def test_signup(self):
        """
        Test the signup method of the User model.
        """
        new_user = get_user_model().objects.create_user(
            username='newuser',
            password='newpass'
        )
        self.assertEqual(new_user.username, 'newuser')
        self.assertTrue(new_user.check_password('newpass'))

    def test_str(self):
        """
        Test the string representation of the User model.
        """
        self.assertEqual(str(self.user), 'testuser')