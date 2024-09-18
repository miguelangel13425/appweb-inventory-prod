import os
import sys
import django

# Configura Django
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.db import transaction
from django.core.management import call_command
from accounts.models import UserModel, RoleModel, StudentModel, ProviderModel
from inventory.factories import (
    WarehouseFactory, LocationFactory, CategoryFactory, 
    ProductFactory, InventoryFactory, InventoryTransactionFactory
)
from accounts.choices import DegreeChoices
from inventory.choices import MovementChoices
from faker import Faker
from faker.exceptions import UniquenessException

fake = Faker()

# Borra todos los datos de la base de datos
def clear_database():
    call_command('flush', '--no-input')

# Crea roles
def create_roles():
    admin_role, _ = RoleModel.objects.get_or_create(name='Administrator', description='Admin role')
    employee_role, _ = RoleModel.objects.get_or_create(name='Employee', description='Employee role')
    return admin_role, employee_role

# Crea usuarios
def create_users():
    admin_role, employee_role = create_roles()
    # Crear superusuario
    superuser = UserModel.objects.create_superuser(
        email='admin@gmail.com',
        first_name='Admin',
        last_name='Admin',
        password='123'
    )
    superuser.role.add(admin_role)
    superuser.save()

    # Crear usuario normal
    user = UserModel.objects.create_user(
        email='yael@example.com',
        first_name='Yael',
        last_name='González',
        password='brilliant24'
    )
    user.role.add(employee_role)
    user.save()

    # Crear 2 administradores adicionales
    for i in range(2):
        admin = UserModel.objects.create_user(
            email=f'admin{i}@example.com',
            first_name=f'Admin{i}',
            last_name=f'User{i}',
            password=f'adminpass{i}'
        )
        admin.role.add(admin_role)
        admin.save()

    # Crear 2 empleados adicionales
    for i in range(2):
        employee = UserModel.objects.create_user(
            email=f'employee{i}@example.com',
            first_name=f'Employee{i}',
            last_name=f'User{i}',
            password=f'employeepass{i}'
        )
        employee.role.add(employee_role)
        employee.save()

# Crea almacenes y ubicaciones
def create_warehouses_and_locations():
    warehouses = []
    for name in ['Otay', 'Tomás Aquino']:
        warehouse = WarehouseFactory(name=name)
        warehouses.append(warehouse)
        for _ in range(15):  # Crear 15 ubicaciones por almacén
            try:
                LocationFactory(warehouse=warehouse)
            except UniquenessException:
                pass  # Si se alcanza el límite de intentos, simplemente ignora la excepción

# Crea categorías
def create_categories():
    for _ in range(30):  # Crear 30 categorías
        try:
            CategoryFactory()
        except UniquenessException:
            pass  # Si se alcanza el límite de intentos, simplemente ignora la excepción

# Crea productos
def create_products():
    for _ in range(300):  # Crear 300 productos
        try:
            ProductFactory()
        except UniquenessException:
            pass  # Si se alcanza el límite de intentos, simplemente ignora la excepción

# Crea personas (estudiantes y profesores)
def create_persons():
    persons = []
    for _ in range(10):  # Crear 10 estudiantes
        student = StudentModel.objects.create(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(),
            control_number=fake.unique.bothify(text='????########'),
            degree=fake.random_element(elements=[choice[0] for choice in DegreeChoices.choices])
        )
        persons.append(student)

    for _ in range(10):  # Crear 10 profesores
        provider = ProviderModel.objects.create(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(),
            RFC=fake.unique.bothify(text='???######???'),
            NSS=fake.unique.bothify(text='###########')
        )
        persons.append(provider)

    return persons

# Crea inventarios
def create_inventories():
    inventories = []
    for _ in range(100):  # Crear 100 inventarios
        try:
            inventory = InventoryFactory()
            inventories.append(inventory)
        except UniquenessException:
            pass  # Si se alcanza el límite de intentos, simplemente ignora la excepción
    return inventories

# Crea transacciones de inventario
def create_inventory_transactions(persons, inventories):
    for _ in range(500):  # Crear 500 transacciones de inventario
        try:
            inventory = fake.random_element(inventories)
            InventoryTransactionFactory(
                inventory=inventory,
                person=fake.random_element(persons),
                quantity=fake.random_int(min=1, max=inventory.quantity if inventory.quantity > 0 else 1),
                movement=fake.random_element(elements=[MovementChoices.IN, MovementChoices.OUT])
            )
        except ValueError:
            pass  # Si ocurre un ValueError (por ejemplo, por inventario insuficiente), simplemente ignora la excepción

# Ejecuta el script
def populate_database():
    clear_database()
    create_users()
    create_warehouses_and_locations()
    create_categories()
    create_products()

    # Crear personas y realizar transacciones
    persons = create_persons()
    inventories = create_inventories()
    create_inventory_transactions(persons, inventories)

if __name__ == '__main__':
    with transaction.atomic():
        populate_database()
