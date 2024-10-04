# Generated by Django 5.0.2 on 2024-10-04 02:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_alter_inventorytransactionmodel_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categorymodel',
            options={'ordering': ['created_at'], 'verbose_name': 'Partida', 'verbose_name_plural': 'Partidas'},
        ),
        migrations.AlterModelOptions(
            name='inventorymodel',
            options={'verbose_name': 'Inventario', 'verbose_name_plural': 'Inventarios'},
        ),
        migrations.AlterModelOptions(
            name='inventorytransactionmodel',
            options={'ordering': ['-created_at'], 'verbose_name': 'Transacción', 'verbose_name_plural': 'Transacciones'},
        ),
        migrations.AlterModelOptions(
            name='locationmodel',
            options={'ordering': ['created_at'], 'verbose_name': 'Ubicación', 'verbose_name_plural': 'Ubicaciones'},
        ),
        migrations.AlterModelOptions(
            name='productmodel',
            options={'ordering': ['created_at'], 'verbose_name': 'Producto', 'verbose_name_plural': 'Productos'},
        ),
        migrations.AlterField(
            model_name='categorymodel',
            name='code',
            field=models.PositiveIntegerField(unique=True, verbose_name='código'),
        ),
        migrations.AlterField(
            model_name='locationmodel',
            name='name',
            field=models.CharField(max_length=64, unique=True, verbose_name='nombre'),
        ),
        migrations.AlterField(
            model_name='productmodel',
            name='name',
            field=models.CharField(max_length=64, unique=True, verbose_name='nombre'),
        ),
    ]