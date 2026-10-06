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
    const response = await fetch("https://dummyjson.com/recipes/search?q=" + searchText);
    const data = await response.json();

// Kontrollerar om några recept hittades
if (data.recipes.length === 0) {
    message.textContent = "Inga recept hittades, prova en ny sökfras!";
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
    servings.textContent = "Servings: " + firstRecipe.servings;
    recipeInfo.appendChild(servings);

    const prepTime = document.createElement("p");
    prepTime.textContent = "Prep Time: " + firstRecipe.prepTimeMinutes;
    recipeInfo.appendChild(prepTime);

    const cookTime = document.createElement("p");
    cookTime.textContent = "Cook Time: " + firstRecipe.cookTimeMinutes;
    recipeInfo.appendChild(cookTime);

    const difficulty = document.createElement("p");
    difficulty.textContent = "Difficulty: " + firstRecipe.difficulty;
    recipeInfo.appendChild(difficulty);



}










