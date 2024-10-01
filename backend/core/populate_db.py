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
from inventory.models import LocationModel, ProductModel  # Asegúrate de importar esto
from inventory.factories import (
    WarehouseFactory, LocationFactory, CategoryFactory, 
    ProductFactory, InventoryFactory, InventoryTransactionFactory
)
from accounts.choices import DegreeChoices, RoleChoices
from inventory.choices import MovementChoices, TypeChoices
from faker import Faker
from faker.exceptions import UniquenessException

fake = Faker()

# Borra todos los datos de la base de datos
def clear_database():
    call_command('flush', '--no-input')

# Crea roles
def create_roles():
    admin_role, _ = RoleModel.objects.get_or_create(name=RoleChoices.ADMIN, description='Admin role')
    employee_role, _ = RoleModel.objects.get_or_create(name=RoleChoices.EMPLOYEE, description='Employee role')
    viewer_role, _ = RoleModel.objects.get_or_create(name=RoleChoices.VIEWER, description='Viewer role')
    return admin_role, employee_role, viewer_role

# Crea usuarios
def create_users():
    admin_role, employee_role, viewer_role = create_roles()
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

    user = UserModel.objects.create_user(
        email='viewer@example.com',
        first_name='Viewer',
        last_name='User',
        password='brilliant24'
    )
    user.role.add(viewer_role)
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
    print(f"Created {len(warehouses)} warehouses and {len(warehouses[0].locations.all())} locations per warehouse.")

# Crea categorías
def create_categories():
    categories_created = 0
    for _ in range(120):  # Crear 120 categorías
        try:
            CategoryFactory()
            categories_created += 1
        except UniquenessException:
            pass  # Si se alcanza el límite de intentos, simplemente ignora la excepción
    print(f"Created {categories_created} categories.")

# Crea productos
def create_products():
    products_created = 0
    for _ in range(800):  # Crear 800 productos
        try:
            ProductFactory()
            products_created += 1
        except UniquenessException:
            pass  # Si se alcanza el límite de intentos, simplemente ignora la excepción
    print(f"Created {products_created} products.")

# Crea personas (estudiantes y proveedores)
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

    for _ in range(10):  # Crear 10 proveedores
        provider = ProviderModel.objects.create(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(),
            RFC=fake.unique.bothify(text='???######???'),
            NSS=fake.unique.bothify(text='###########')
        )
        persons.append(provider)

    print(f"Created {len(persons)} persons (students and providers).")
    return persons

# Crea inventarios
def create_inventories():
    inventories = []
    products = ProductModel.objects.all()
    locations = LocationModel.objects.all()

    if not products.exists():
        print("No products available for creating inventories.")
        return inventories

    if not locations.exists():
        print("No locations available for creating inventories.")
        return inventories

    for _ in range(100):  # Crear 100 inventarios
        try:
            inventory = InventoryFactory(
                product=fake.random_element(products),
                location=fake.random_element(locations)
            )
            inventories.append(inventory)
        except UniquenessException as e:
            print(f"UniquenessException: {e}")
            pass  # Si se alcanza el límite de intentos, simplemente ignora la excepción
        except Exception as e:
            print(f"Exception: {e}")
            pass  # Captura cualquier otra excepción y la reporta

    print(f"Created {len(inventories)} inventories.")
    return inventories

# Crea transacciones de inventario
def create_inventory_transactions(persons, inventories):
    if not inventories:
        print("No inventories created.")
        return

    if not persons:
        print("No persons created.")
        return

    transactions_created = 0
    for _ in range(500):  # Crear 500 transacciones de inventario
        try:
            inventory = fake.random_element(inventories)
            movement = fake.random_element(elements=[MovementChoices.IN, MovementChoices.OUT])
            type_choice = fake.random_element(elements=[choice[0] for choice in TypeChoices.choices])
            
            # Validación de restricciones de tipo y movimiento
            if movement == MovementChoices.IN and type_choice in [TypeChoices.LOST, TypeChoices.DAMAGED]:
                type_choice = fake.random_element(elements=[choice[0] for choice in TypeChoices.choices if choice not in [TypeChoices.LOST, TypeChoices.DAMAGED]])
            if movement == MovementChoices.OUT and type_choice == TypeChoices.PURCHASE:
                type_choice = fake.random_element(elements=[choice[0] for choice in TypeChoices.choices if choice != TypeChoices.PURCHASE])
            
            # Validación de cantidad
            quantity = fake.random_int(min=1, max=inventory.quantity if movement == MovementChoices.OUT and inventory.quantity > 0 else 100)
            
            InventoryTransactionFactory(
                inventory=inventory,
                person=fake.random_element(persons),
                quantity=quantity,
                movement=movement,
                type=type_choice,
                description=fake.text(max_nb_chars=128)
            )
            transactions_created += 1
        except ValueError:
            pass  # Si ocurre un ValueError (por ejemplo, por inventario insuficiente), simplemente ignora la excepción

    print(f"Created {transactions_created} inventory transactions.")

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

    if not inventories:
        print("Error: No inventories created.")
        return

    if not persons:
        print("Error: No persons created.")
        return

    create_inventory_transactions(persons, inventories)

if __name__ == '__main__':
    with transaction.atomic():
        populate_database()
