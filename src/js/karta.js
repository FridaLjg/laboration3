"use strict";

function buildMap(lat, lon, pad = 0.01, layer = 'mapnik') {
    const left = lon - pad;
    const right = lon + pad;
    const bottom = lat - pad;
    const top = lat + pad;
    const bbox = [left, bottom, right, top].join('%2C');
    const marker = `${lat}%2C${lon}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=${layer}&marker=${marker}`;

}

async function loadData(city) {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

    url.searchParams.set('name', city);
    url.searchParams.set("count", "1");

    //Anropa och läs ut data
    try {
        const response = await fetch(url.toString());
        const data = await response.json();

        const first = data.results?.[0];
        const lat = first.latitude;
        const lon = first.longitude;

        const frame = document.getElementById("map");
        frame.src = buildMap(lat, lon);

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