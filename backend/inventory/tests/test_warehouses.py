from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from inventory.models import WarehouseModel
from accounts.models import RoleModel

User = get_user_model()

class WarehouseTests(APITestCase):

    def setUp(self):
        """
        Set up a user and authenticate it for testing.
        Create a warehouse for testing update and delete.
        """
        self.email = "QpB6K@example.com"
        self.password = "password"
        self.role = RoleModel.objects.create(name='ADMIN', description='Admin role')
        self.user = User.objects.create_user(
            email=self.email,
            password=self.password,
            first_name="Test",
            last_name="User"
        )
        self.user.role.set([self.role])  # Use set() method to assign many-to-many field

        # Authenticate the user
        auth_url = '/api/v1/accounts/auth/jwt/create/'
        response = self.client.post(auth_url, {
            'email': self.email,
            'password': self.password
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

        # Create warehouses for testing
        self.warehouse1 = WarehouseModel.objects.create(
            name="Warehouse1",
            description="Description1"
        )
        self.warehouse2 = WarehouseModel.objects.create(
            name="Warehouse2",
            description="Description2"
        )

        self.list_url = reverse('warehouse-list')
        self.detail_url = reverse('warehouse-detail', kwargs={'pk': self.warehouse1.pk})
        self.detail_url_2 = reverse('warehouse-detail', kwargs={'pk': self.warehouse2.pk})

    def test_create_warehouse_with_valid_data(self):
        """
        Ensure we can create a warehouse with valid data.
        """
        data = {
            "name": "New Warehouse",
            "description": "New Description"
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['warehouse']['name'], 'New Warehouse')
        self.assertEqual(response.data['warehouse']['description'], 'New Description')

    def test_create_warehouse_with_invalid_data(self):
        """
        Ensure we cannot create a warehouse with invalid data.
        """
        data = {
            "name": "0Atlanta",
            "description": "a"
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], '¡Hubo un error de validación!')
        self.assertIn('errors', response.data)
        self.assertIn('name', response.data['errors'])

    def test_update_warehouse_with_valid_data(self):
        """
        Ensure we can update a warehouse with valid data.
        """
        data = {
            "name": "Updated Warehouse",
            "description": "Updated Description"
        }
        response = self.client.put(self.detail_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], '¡Campus actualizado con éxito!')

    def test_update_warehouse_with_invalid_data(self):
        """
        Ensure we cannot update a warehouse with invalid data.
        """
        data = {
            "name": "0Atlanta",
            "description": "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        }
        response = self.client.put(self.detail_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], '¡Hubo un error de validación!')
        self.assertIn('errors', response.data)
        self.assertIn('name', response.data['errors'])
        self.assertIn('description', response.data['errors'])

    def test_delete_warehouse(self):
        """
        Ensure we can delete a warehouse.
        """
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], '¡Campus eliminado con éxito!')

    def test_get_all_warehouses(self):
        """
        Ensure we can get all warehouses.
        """
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], '¡Campus encontrados con éxito!')
        self.assertIn('warehouses', response.data)
        self.assertEqual(len(response.data['warehouses']), 2)

    def test_get_warehouse_by_id(self):
        """
        Ensure we can get a warehouse by ID.
        """
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], '¡Campus encontrado con éxito!')
        self.assertIn('warehouse', response.data)
        self.assertEqual(response.data['warehouse']['id'], str(self.warehouse1.pk))
        self.assertEqual(response.data['warehouse']['name'], self.warehouse1.name)
        self.assertEqual(response.data['warehouse']['description'], self.warehouse1.description)
