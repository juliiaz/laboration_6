"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Julia Anderberg
 */

const searchForm = document.getElementById("searchform");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

const searchText = searchInput.value;
if (searchText.trim() === "") {
    errorMessage.textContent = "Skriv in en sökfras!";
    return;
}

errorMessage.textContent = "";

});

