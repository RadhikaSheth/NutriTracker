# Generated by Django 3.1.7 on 2021-04-17 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0007_food_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
