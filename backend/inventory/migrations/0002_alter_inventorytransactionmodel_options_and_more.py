# Generated by Django 5.0.2 on 2024-10-04 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='inventorytransactionmodel',
            options={'ordering': ['-created_at'], 'verbose_name': 'Inventory Transaction', 'verbose_name_plural': 'Inventory Transactions'},
        ),
        migrations.AlterModelOptions(
            name='warehousemodel',
            options={'ordering': ['created_at'], 'verbose_name': 'Campus', 'verbose_name_plural': 'Campus'},
        ),
        migrations.AlterField(
            model_name='warehousemodel',
            name='name',
            field=models.CharField(max_length=64, unique=True, verbose_name='nombre'),
        ),
    ]
