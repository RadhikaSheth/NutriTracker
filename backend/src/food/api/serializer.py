from rest_framework import serializers
from food.models import Food,User
class FoodSerializer (serializers.ModelSerializer):
    class Meta:
        model = Food
        fields=('uname','date','foodDish','calories','protein','carb','fat','sodium','potassium')   

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('uname','age','gender')