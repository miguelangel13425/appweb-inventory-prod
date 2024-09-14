import os
import sys
import django

# Configura Django
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.db import transaction
from django.core.management import call_command
from accounts.models import UserModel
from inventory.factories import (
    WarehouseFactory, LocationFactory, CategoryFactory, 
    ProductFactory
)

# Borra todos los datos de la base de datos
def clear_database():
    call_command('flush', '--no-input')

# Crea usuarios
def create_users():
    # Crear superusuario
    superuser = UserModel.objects.create_superuser(
        email='admin@gmail.com', 
        first_name='Admin',
        last_name='Admin',
        password='123'
    )
    superuser.save()
    # Crear usuario normal
    user = UserModel.objects.create_user(
        email='yael@example.com',
        first_name='Yael',
        last_name='González',
        password='brilliant24'
    )
    user.save()

# Crea almacenes y ubicaciones
def create_warehouses_and_locations():
    warehouses = []
    for name in ['Otay', 'Tomás Aquino']:
        warehouse = WarehouseFactory(name=name)
        warehouses.append(warehouse)
        for _ in range(10):
            LocationFactory(warehouse=warehouse)

# Crea categorías
def create_categories():
    for _ in range(20):  # Crear 20 categorías
        CategoryFactory()

# Crea productos
def create_products():
    for _ in range(50):
        ProductFactory()

# Ejecuta el script
def populate_database():
    clear_database()
    create_users()
    create_warehouses_and_locations()
    create_categories()
    create_products()

if __name__ == '__main__':
    with transaction.atomic():
        populate_database()
