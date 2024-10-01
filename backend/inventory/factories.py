import factory
from factory import django, SubFactory
from faker import Faker
from .models import WarehouseModel, LocationModel, CategoryModel, ProductModel, InventoryModel, InventoryTransactionModel
from accounts.factories import PersonFactory
from .choices import UnitChoices, MovementChoices, TypeChoices

fake = Faker()

class WarehouseFactory(django.DjangoModelFactory):
    class Meta:
        model = WarehouseModel

    name = factory.LazyAttribute(lambda _: fake.unique.company())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))

class LocationFactory(django.DjangoModelFactory):
    class Meta:
        model = LocationModel

    name = factory.LazyAttribute(lambda _: fake.unique.city())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))
    warehouse = SubFactory(WarehouseFactory)

class CategoryFactory(django.DjangoModelFactory):
    class Meta:
        model = CategoryModel

    code = factory.LazyAttribute(lambda _: fake.unique.random_int(min=10000000, max=99999999))
    name = factory.LazyAttribute(lambda _: fake.unique.word())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))

class ProductFactory(django.DjangoModelFactory):
    class Meta:
        model = ProductModel

    name = factory.LazyAttribute(lambda _: fake.unique.word())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))
    unit = factory.LazyAttribute(lambda _: fake.random_element(elements=[choice[0] for choice in UnitChoices.choices]))
    category = SubFactory(CategoryFactory)
    is_single_use = factory.LazyAttribute(lambda _: fake.boolean())

class InventoryFactory(django.DjangoModelFactory):
    class Meta:
        model = InventoryModel

    product = SubFactory(ProductFactory)
    location = SubFactory(LocationFactory)

class InventoryTransactionFactory(django.DjangoModelFactory):
    class Meta:
        model = InventoryTransactionModel

    inventory = SubFactory(InventoryFactory)
    person = SubFactory(PersonFactory)
    quantity = factory.LazyAttribute(lambda _: fake.random_int(min=1, max=100))
    movement = factory.LazyAttribute(lambda _: fake.random_element(elements=[MovementChoices.IN, MovementChoices.OUT]))
    type = factory.LazyAttribute(lambda _: fake.random_element(elements=[choice[0] for choice in TypeChoices.choices]))
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))
