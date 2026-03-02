"use strict";


async function loadData(city) {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

    url.searchParams.set('name', city);
    url.searchParams.set("count", "1");

    //Anropa och läs ut data
    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        console.log(data)

    } catch (error) {
        console.error("Fel " + error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const input = document.getElementById("search");
    const button = document.getElementById("search-button");

    button.addEventListener('click', () => {
        const city = input.value.trim();

        loadData(city);
    })
});