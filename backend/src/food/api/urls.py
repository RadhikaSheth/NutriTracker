from django.urls import path
from .views import FoodDetailView,viewFood,addFood,UserCreate,Userview,requiredNutrition,getCurrentUser

urlpatterns = [
    path('',viewFood.as_view()),
    path('create/',addFood.as_view()),
    path('getRequiredNutrition/',requiredNutrition.as_view()),
    path('createUser/',UserCreate.as_view()),
    path('getUser/',getCurrentUser.as_view()),
    path('viewUser/',Userview.as_view()),
    path('<pk>/',FoodDetailView.as_view())
]
