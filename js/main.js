"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Julia Anderberg
 */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const errorMessage = document.getElementById("error");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
});

