import factory
from faker import Faker
from django.utils import timezone
from .models import UserModel, ProfileModel, PersonModel, StudentModel, ProviderModel
from .choices import GenderChoices, DegreeChoices, RoleChoices

fake = Faker()

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = UserModel

    email = factory.LazyAttribute(lambda _: fake.email())
    first_name = factory.LazyAttribute(lambda _: fake.first_name())
    last_name = factory.LazyAttribute(lambda _: fake.last_name())
    is_staff = False
    is_active = True
    date_joined = factory.LazyFunction(timezone.now)
    gender = factory.LazyAttribute(lambda _: fake.random_element(elements=[choice[0] for choice in RoleChoices.choices]))


class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProfileModel

    user = factory.SubFactory(UserFactory)
    gender = factory.LazyAttribute(lambda _: fake.random_element(elements=[choice[0] for choice in GenderChoices.choices]))
    birthdate = factory.LazyAttribute(lambda _: fake.date_of_birth(tzinfo=None, minimum_age=18, maximum_age=65))
    bio = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=128))

class PersonFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PersonModel

    first_name = factory.LazyAttribute(lambda _: fake.first_name())
    last_name = factory.LazyAttribute(lambda _: fake.last_name())
    email = factory.LazyAttribute(lambda _: fake.email())
    phone_number = factory.LazyAttribute(lambda _: fake.phone_number())

class StudentFactory(PersonFactory):
    class Meta:
        model = StudentModel

    control_number = factory.LazyAttribute(lambda _: fake.unique.bothify(text='????########'))
    degree = factory.LazyAttribute(lambda _: fake.random_element(elements=[choice[0] for choice in DegreeChoices.choices]))

class ProviderFactory(PersonFactory):
    class Meta:
        model = ProviderModel

    RFC = factory.LazyAttribute(lambda _: fake.unique.bothify(text='???######???'))
    NSS = factory.LazyAttribute(lambda _: fake.unique.bothify(text='###########'))
