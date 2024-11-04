from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from accounts.choices import RoleChoices

User = get_user_model()

class AuthTests(APITestCase):

    def setUp(self):
        """
        Set up roles and users for testing.
        """
        self.email = "XKtP3@example.com"
        self.password = "password123"
        self.role = RoleChoices.ADMIN
        self.user = User.objects.create_user(
            email=self.email,
            password=self.password,
            first_name="Test",
            last_name="User",
            role=self.role
        )

    def test_create_user_with_valid_data(self):
        """
        Ensure we can create a user with valid data.
        """
        url = '/api/v1/accounts/auth/users/'
        data = {
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'role': "ADMIN",
            'password': 'newpassword123',
            're_password': 'newpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(User.objects.get(email='newuser@example.com').first_name, 'New')

    def test_create_user_with_invalid_data(self):
        """
        Ensure we cannot create a user with invalid data.
        """
        url = '/api/v1/accounts/auth/users/'
        data = {
            'email': 'invalidemail',  # invalid email
            'first_name': '',  # empty first name
            'last_name': '',  # empty last name
            'role': '',
            'password': 'short',  # too short password
            're_password': 'different'  # passwords do not match
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertIn('first_name', response.data)
        self.assertIn('last_name', response.data)
        if 'password' in response.data:
            self.assertIn('password', response.data)
        if 'non_field_errors' in response.data:
            self.assertIn('non_field_errors', response.data)

    def test_login_with_valid_data(self):
        """
        Ensure we can login with valid data.
        """
        url = '/api/v1/accounts/auth/jwt/create/'
        data = {
            'email': self.email,
            'password': self.password
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_with_invalid_data(self):
        """
        Ensure we cannot login with invalid data.
        """
        url = '/api/v1/accounts/auth/jwt/create/'
        data = {
            'email': self.email,
            'password': 'wrongpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)

    def test_reset_password_with_valid_data(self):
        """
        Ensure we can request a password reset with valid data.
        """
        url = '/api/v1/accounts/auth/users/reset_password/'
        data = {
            'email': 'XKtP3@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_reset_password_with_invalid_data(self):
        """
        Ensure we cannot request a password reset with invalid data.
        """
        url = '/api/v1/accounts/auth/users/reset_password/'
        data = {
            'email': 'invalidemail@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_reset_password_confirm_with_valid_data(self):
        """
        Ensure we can confirm a password reset with valid data.
        """
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        token = default_token_generator.make_token(self.user)
        url = '/api/v1/accounts/auth/users/reset_password_confirm/'
        data = {
            'uid': uid,
            'token': token,
            'new_password': 'newpassword123',
            're_new_password': 'newpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('newpassword123'))

    def test_reset_password_confirm_with_invalid_uid_format(self):
        """
        Ensure we cannot confirm a password reset with an invalid UID format.
        """
        url = '/api/v1/accounts/auth/users/reset_password_confirm/'
        data = {
            'uid': 'invaliduidformat',  # This is not a base64 encoded string
            'token': default_token_generator.make_token(self.user),
            'new_password': 'newpassword123',
            're_new_password': 'newpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('uid', response.data)
        self.assertEqual(response.data['uid'][0], "Invalid user id or user doesn't exist.")

    def test_jwt_refresh_with_valid_data(self):
        """
        Ensure we can refresh JWT with valid data.
        """
        # First, login to get the refresh token
        url = '/api/v1/accounts/auth/jwt/create/'
        data = {
            'email': self.email,
            'password': self.password
        }
        response = self.client.post(url, data, format='json')
        refresh_token = response.data['refresh']

        # Use the refresh token to get a new access token
        url = '/api/v1/accounts/auth/jwt/refresh/'
        data = {
            'refresh': refresh_token
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_jwt_refresh_with_invalid_data(self):
        """
        Ensure we cannot refresh JWT with invalid data.
        """
        url = '/api/v1/accounts/auth/jwt/refresh/'
        data = {
            'refresh': 'invalidrefreshtoken'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], "El token es inválido o ha expirado")
        self.assertEqual(response.data['code'], "token_not_valid")
