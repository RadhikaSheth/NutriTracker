# Generated by Django 3.1.7 on 2021-04-18 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0009_auto_20210418_0821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
