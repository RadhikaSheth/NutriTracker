# Generated by Django 3.1.7 on 2021-04-18 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0010_auto_20210418_0824'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='date',
            field=models.DateField(),
        ),
    ]
