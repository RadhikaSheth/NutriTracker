# Generated by Django 3.1.7 on 2021-04-18 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0008_auto_20210417_0254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='date',
            field=models.DateField(),
        ),
    ]
