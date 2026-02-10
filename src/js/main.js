"use strict";

//Funktion för klocka
function clock() {
    const timeNow = new Date();
    document.getElementById("clock").textContent = timeNow.toLocaleTimeString();
}

setInterval(clock, 1000);
clock();

//Funktion för hamburgermeny

const hamburger = document.querySelector("#menu-toggle");
const menu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
});

