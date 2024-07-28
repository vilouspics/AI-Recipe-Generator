function displayRecipe(response) {
    let recipeText = response.data.answer;
    recipeText = recipeText.replace(/\n/g, `<br>`);

    new Typewriter("#recipe", {
        strings: recipeText,
        autoStart: true,
        delay: 40,
        cursor: "",
    });
}

function generateRecipe(event) {
    event.preventDefault();

    let calorieInput = document.querySelector("#calorie-input").value;
    let carbsInput = document.querySelector("#carbs-input").value;
    let proteinInput = document.querySelector("#protein-input").value;
    let fatInput = document.querySelector("#fat-input").value;

    let breakfastCalories = 614;  // Frühstücks-Nährwerte abziehen
    let remainingCalories = calorieInput - breakfastCalories;
    
    // Proportionen der verbleibenden Nährstoffe berechnen
    let remainingCarbs = carbsInput * remainingCalories / calorieInput;
    let remainingProtein = proteinInput * remainingCalories / calorieInput;
    let remainingFat = fatInput * remainingCalories / calorieInput;

    let apiKey = "00beca703bc44c5a7o5477ctfdbf0239";
    let prompt = `Generate a vegan meal plan for a day with ${remainingCalories} calories, consisting of lunch and dinner. The macronutrient distribution should be approximately ${remainingCarbs}% carbs, ${remainingProtein}% protein, and ${remainingFat}% fat. Each meal should include detailed nutritional information, separated by a comma, at the beginning of the recipe for each meal.`;
    let context = "You are a vegan meal planner AI specialized in creating daily meal plans for athletes and health-conscious individuals. The meal plan should be tasty, nutritious, and align with the user's calorie and macronutrient goals. Each meal (lunch and dinner) should include a short recipe with ingredients and preparation steps, followed by nutritional information in the format: Calories, Carbs, Protein, Fat.";
    let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    let recipeElement = document.querySelector("#recipe");

    recipeElement.classList.remove("hidden");
    recipeElement.innerHTML = `<div class="blink-soft">Generating a Plant 🌱 Based Meal Plan for you...</div>`;

    console.log("API URL:", apiURL);

    axios.get(apiURL)
        .then(displayRecipe)
        .catch((error) => {
            console.error("Error generating recipe:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            }
            recipeElement.classList.remove("hidden");
            recipeElement.innerHTML = 'Sorry, there was an error generating your recipe. Please try again.';
        });
}

let recipeFormElement = document.querySelector("#meal-planner-form");
recipeFormElement.addEventListener("submit", generateRecipe);

