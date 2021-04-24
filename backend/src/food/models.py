from django.db import models

class Food(models.Model):
    uname = models.name = models.CharField(max_length=120)
    date= models.name = models.DateField()
    foodDish = models.name = models.CharField(max_length=300)
    calories = models.name = models.CharField(max_length=100)
    protein = models.name = models.CharField(max_length=100)
    carb = models.name = models.CharField(max_length=100)
    fat = models.name = models.CharField(max_length=100)
    sodium = models.name = models.CharField(max_length=100)
    potassium = models.name = models.CharField(max_length=100)


    def __str__(self):
        return self.uname
class User(models.Model):
    uname = models.name = models.CharField(max_length=120)
    age = models.name = models.CharField(max_length=120)
    gender = models.name = models.CharField(max_length=120)