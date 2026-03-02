"use strict";

/**
 * Gör en URL till OpenStreetMap.
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @param {number} [pad=0.01] - Marginal runt koordinaten
 * @returns {string} - URL
 *
*/
function buildMap(lat, lon, pad = 0.01, layer = 'mapnik') {
    const left = lon - pad;
    const right = lon + pad;
    const bottom = lat - pad;
    const top = lat + pad;
    const bbox = [left, bottom, right, top].join('%2C');
    const marker = `${lat}%2C${lon}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=${layer}&marker=${marker}`;
}

/**
 * Hämtar koordinater och uppdaterar kartan.
 * @async
 * @param {string} city - Stadens namn
 * @returns {Promise<void>} - Fullföljs när kartan är uppdaterad
 */
async function loadData(city) {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", city);
    url.searchParams.set("count", "1");

    //Anropa och läs ut data
    try {
        const response = await fetch(url.toString());
        const data = await response.json();

        const location = data.results?.[0];
        const lat = location.latitude;
        const lon = location.longitude;

        const frame = document.getElementById("map");
        frame.src = buildMap(lat, lon);

    } catch (error) {
        console.error("Fel " + error);
    }
}

/**
 * Händelsehanterare
 */
document.addEventListener("DOMContentLoaded", async () => {
    const input = document.getElementById("search");
    const button = document.getElementById("search-button");

    button.addEventListener('click', () => {
        const city = input.value;

        loadData(city);
    })
});