"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Julia Anderberg
 */

// Hämtar formulärelement från HTML
const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error");
const message = document.getElementById("message");
const recipeSection = document.getElementById("recipe");

// Körs när formuläret skickas
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

const searchText = searchInput.value;

// Kontrollerar att sökfältet inte är tomt
if (searchText.trim() === "") {
    errorMessage.textContent = "Skriv in en sökfras!";
    return;
}

errorMessage.textContent = "";

getRecipes(searchText);
});

// Hämtar recept från API:t
async function getRecipes(searchText) {
    try {
    const response = await fetch("https://dummyjson.com/recipes/search?q=" + searchText);

// Upptäcker eventuella fel vid API-anrop
    if (!response.ok) {
    throw new Error("Något gick fel vid API-anropet.");
    }

// Omvandlar svaret från API:t till JSON
    const data = await response.json();

// Kontrollerar om några recept hittades
if (data.recipes.length === 0) {
    message.textContent = "Inga recept hittades, prova en ny sökfras!";
    recipeSection.innerHTML = "";
    return;
    }

// Tar det första receptet från resultatet
    const firstRecipe = data.recipes[0];

    message.textContent = "";
    recipeSection.innerHTML = "";

// Skapar article-element för receptet
    const article = document.createElement("article");
 // Lägger article-elementet i recipe-section
    recipeSection.appendChild(article);

// Skapar och visar receptets namn
    const title = document.createElement("h3");
    title.textContent = firstRecipe.name;
    article.appendChild(title);

// Skapar och visar receptets bild
    const image = document.createElement("img");
    image.src = firstRecipe.image;
    image.alt = firstRecipe.name;
    article.appendChild(image);

// Skapar behållare för receptets information
    const recipeInfo = document.createElement("div");
    recipeInfo.className = "recipe-info";
    article.appendChild(recipeInfo);

// Skapar och visar receptets information
    const servings = document.createElement("p");
    const servingsStrong = document.createElement("strong");
    servingsStrong.textContent = "Servings: ";
// Lägger "Servings:" inuti p-elementet
    servings.appendChild(servingsStrong);
// Lägger till antalet portioner från API:t
    servings.append(firstRecipe.servings);
// Lägger p-elementet inuti recipeInfo
    recipeInfo.appendChild(servings);

    const prepTime = document.createElement("p");
    const prepTimeStrong = document.createElement("strong");
    prepTimeStrong.textContent = "Prep Time: ";
    prepTime.appendChild(prepTimeStrong);
    prepTime.append(firstRecipe.prepTimeMinutes);
    recipeInfo.appendChild(prepTime);

    const cookTime = document.createElement("p");
    const cookTimeStrong = document.createElement("strong");
    cookTimeStrong.textContent = "Cook Time: ";
    cookTime.appendChild(cookTimeStrong);
    cookTime.append(firstRecipe.cookTimeMinutes);
    recipeInfo.appendChild(cookTime);

    const difficulty = document.createElement("p");
    const difficultyStrong = document.createElement("strong");
    difficultyStrong.textContent = "Difficulty: ";
    difficulty.appendChild(difficultyStrong);
    difficulty.append(firstRecipe.difficulty);
    recipeInfo.appendChild(difficulty);

// Skapar titel för ingredienslistan
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients";
    article.appendChild(ingredientsTitle);

// Skapar en punktlista för ingredienser
    const ingredientsList = document.createElement("ul");
    article.appendChild(ingredientsList);
// Loopar igenom ingredienserna och lägger till dem i listan
    firstRecipe.ingredients.forEach(function (ingredient) {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = ingredient;
        ingredientsList.appendChild(ingredientItem);
    });

// Skapar titel för instruktionerna
   const instructionsTitle = document.createElement("h4");
   instructionsTitle.textContent = "Instructions";
   article.appendChild(instructionsTitle);

// Skapar en numrerad lista för instruktionerna
   const instructionsList = document.createElement("ol");
    article.appendChild(instructionsList);

// Loopar igenom instruktionerna och lägger till dem i listan
    firstRecipe.instructions.forEach(function (instruction) {
        const instructionItem = document.createElement("li");
        instructionItem.textContent = instruction;
        instructionsList.appendChild(instructionItem);
    });

// Visar felmeddelande på webbplatsen och skriver ut felet i konsolen
    } catch (error) {
        recipeSection.innerHTML = "";
        message.textContent = "Ett fel uppstod, försök igen senare.";
        console.error(error);
    }
}










