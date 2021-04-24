from food.models import Food,User
from .serializer import FoodSerializer,UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import date
import json
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView,DestroyAPIView,UpdateAPIView
import requests

class viewFood(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        snippets = Food.objects.filter(uname=self.request.user)
        serializer = FoodSerializer(snippets, many=True)
        return Response(serializer.data)
    
class addFood(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        foodquery = request.data.get("foodDish")

        result = requests.post("https://trackapi.nutritionix.com/v2/natural/nutrients",
        headers={ "Content-Type" : "application/json" ,"accept": "application/json", "x-app-id" : "eb1386bc", "x-app-key" : "3fba02985c83013111596f85b4be183c","x-remote-user-id": "0"},
        data='{"query":"%s"}'%foodquery
        )

        result = result.json()
        foodArray = result["foods"]
        x=""
        calories = 0
        protein = 0
        carb =0
        fat=0
        sodium=0
        potassium=0
        for i in foodArray:
            x = i["food_name"]
            calories += 0 if i["nf_calories"] is None else i["nf_calories"]
            protein += 0 if i["nf_protein"] is None else i["nf_protein"]
            carb += 0 if i["nf_total_carbohydrate"] is None else i["nf_total_carbohydrate"]
            fat += 0 if i["nf_total_fat"] is None else i["nf_total_fat"]
            sodium += 0 if i["nf_sodium"] is None else i["nf_sodium"]
            potassium += 0 if i["nf_potassium"] is None else i["nf_potassium"]

        inData = {"uname": self.request.user.username,"date":date.today(), "foodDish" : foodquery,"calories" :calories ,"protein" : protein,"carb" :carb,"fat" : fat,"sodium" : sodium,"potassium" : potassium}
        serializer = FoodSerializer(data=inData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class getCurrentUser(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self):
        return Response(self.request.user.username)

class FoodDetailView(RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

class Userview(ListAPIView):
    queryset=User.objects.all()
    serializer_class = UserSerializer
class UserCreate(CreateAPIView):
    queryset=User.objects.all()
    serializer_class = UserSerializer

class requiredNutrition(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        age = User.objects.filter(uname=self.request.user).values('age')
        age = age[0]['age']
        age = int(age)
        gender = User.objects.filter(uname=self.request.user).values('gender')
        gender = gender[0]['gender']
        
        if gender == "male":
            if age >= 10 and age < 20:
                calories = 2750
                protein = 52
                carb = 315
                fat = 83.2
                sodium = 2491
                potassium = 3400
            elif age >= 20 and age < 30:
                calories = 2441
                protein = 129.9
                carb = 264
                fat = 97.7
                sodium = 2524
                potassium = 3598
            elif age >= 30 and age < 40:
                calories = 2445
                protein = 131.9
                carb = 262.4
                fat = 98.2
                sodium = 2551
                potassium = 3692
            elif age >= 40 and age < 50:
                calories = 2336
                protein = 126.7
                carb = 252.9
                fat = 93
                sodium = 2515 
                potassium = 3746
            elif age >= 50 and age < 60:
                calories = 2258
                protein = 123.9
                carb = 244.5
                fat = 89.4
                sodium = 2308
                potassium = 3824
            elif age >= 60 and age < 70:
                calories = 2078
                protein = 112.9
                carb = 231.3
                fat = 80.6
                sodium = 2025
                potassium = 3640
        else :
            if age >= 10 and age < 20:
                calories = 2200
                protein = 45
                carb = 185
                fat = 75.8
                sodium = 1955
                potassium = 2600
            elif age >= 20 and age < 30:
                calories = 2167
                protein = 118.4
                carb = 226.6
                fat = 88.7
                sodium = 2168
                potassium = 3524
            elif age >= 30 and age < 40:
                calories = 2195
                protein = 121.5
                carb = 233.7
                fat = 87.2
                sodium = 2046
                potassium = 3638
            elif age >= 40 and age < 50:
                calories = 2117
                protein = 115.1
                carb = 225.8
                fat = 85.2
                sodium = 1962
                potassium = 3629
            elif age >= 50 and age < 60:
                calories = 2063
                protein = 114.5
                carb = 225.2
                fat = 79.9
                sodium = 1910
                potassium = 3639
            elif age >= 60 and age < 70:
                calories = 1880
                protein = 104.1
                carb = 202.8
                fat = 72.3
                sodium = 1677
                potassium = 3461
        requiredData = {
            "requiredCalories" : calories,
            "requiredProtein" : protein,
            "requiredCarb" : carb,
            "requiredFat" : fat,
            "requiredSodium" : sodium,
            "requiredPotassium" : potassium,
        }
        return Response(requiredData)
