import factory
from factory import django, SubFactory, post_generation
from faker import Faker  # Asegúrate de importar Faker del paquete faker
from .models import WarehouseModel, LocationModel, CategoryModel, ProductModel, InventoryModel, InventoryTransactionModel
from .choices import UnitChoices, MovementChoices

# Inicializa Faker una vez
fake = Faker()

class WarehouseFactory(django.DjangoModelFactory):
    class Meta:
        model = WarehouseModel

    name = factory.LazyAttribute(lambda _: fake.company())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))

class LocationFactory(django.DjangoModelFactory):
    class Meta:
        model = LocationModel

    name = factory.LazyAttribute(lambda _: fake.city())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))
    warehouse = SubFactory(WarehouseFactory)

class CategoryFactory(django.DjangoModelFactory):
    class Meta:
        model = CategoryModel

    code = factory.LazyAttribute(lambda _: fake.unique.ean8())
    name = factory.LazyAttribute(lambda _: fake.unique.word())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))

class ProductFactory(django.DjangoModelFactory):
    class Meta:
        model = ProductModel

    name = factory.LazyAttribute(lambda _: fake.unique.word())  # Asegura nombres únicos
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))
    unit = factory.LazyAttribute(lambda _: fake.random_element(elements=[choice[0] for choice in UnitChoices.choices]))
    category = SubFactory(CategoryFactory)

class InventoryFactory(django.DjangoModelFactory):
    class Meta:
        model = InventoryModel

    product = SubFactory(ProductFactory)
    location = SubFactory(LocationFactory)
    quantity = factory.LazyAttribute(lambda _: fake.random_int(min=0, max=100))

class InventoryTransactionFactory(django.DjangoModelFactory):
    class Meta:
        model = InventoryTransactionModel

    product = SubFactory(ProductFactory)
    location = SubFactory(LocationFactory)
    quantity = factory.LazyAttribute(lambda _: fake.random_int(min=0, max=100))
    movement = factory.LazyAttribute(lambda _: fake.random_element(elements=[choice[0] for choice in MovementChoices.choices]))

    @post_generation
    def update_inventory(self, create, extracted, **kwargs):
        if create:
            self.update_inventory()
