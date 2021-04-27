# NutritionTracker
Nutrition Tracker taken in the user's food intake, calculates its nutriotion values with the help of Nutritionix API, compares with the required nutritions as per age and gender, and outputs the user's daily Nutri-Stats ans some suggestions regarding the same.

Code Flow


Backend/src:


  Nutrition Tracker : Consists main settings.py and default urls.py
  
  
  food: Consists main models.py(Database)
  
  food->api : Consists the enitire communication with database, communicating with Nutritionix API, important urls.py and serializers.py
  
  
  
Frontend/src:

InputData.js : For taking input query from user.

GetStats.js : For displaying nutrition statistics and suggestion to the user.

store/ : Files required for user login/registeration.

Other files: Containing varoius required components.
