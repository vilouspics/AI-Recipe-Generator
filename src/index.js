function displayRecipe(response) {
    new Typewriter("#recipe", {
        strings: response.data.answer,
        autoStart: true,
        delay: 40,
        cursor: "",
    });
}

function generateRecipe(event) {
    event.preventDefault();

    let calorieInput = document.querySelector("#calorie-input");
    let carbsInput = document.querySelector("#carbs-input");
    let proteinInput = document.querySelector("#protein-input");
    let fatInput = document.querySelector("#fat-input");

    let apiKey = "00beca703bc44c5a7o5477ctfdbf0239";
    let prompt = `Generate a vegan meal plan for a day with ${calorieInput.value} calories, consisting of breakfast, lunch, dinner, and snacks. The macronutrient distribution should be ${carbsInput.value}% carbs, ${proteinInput.value}% protein, and ${fatInput.value}% fat.`;
    let context = "You are a vegan meal planner AI specialized in creating daily meal plans for athletes and health-conscious individuals. The meal plan should be tasty, nutritious, and align with the user's calorie and macronutrient goals. Each meal (breakfast, lunch, dinner, and snacks) should include a detailed recipe with ingredients and preparation steps.";
    let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    let recipeElement = document.querySelector("#recipe");

    recipeElement.classList.remove("hidden");
    recipeElement.innerHTML = `<div class="blink-soft">Generating a Plant Based Meal Plan for you...</div>`;

    axios.get(apiURL).then(displayRecipe);
}

let recipeFormElement = document.querySelector("#meal-planner-form");
recipeFormElement.addEventListener("submit", generateRecipe);
