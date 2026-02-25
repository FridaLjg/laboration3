"use strict";
let allData = [];

async function loadData() {
    const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

    //Anropa och läs ut data
    try {
        const response = await fetch(url);
        const data = await response.json();

        //Lagra globalt
        allData = data;

        displayData(data);

    } catch (error) {
        console.error("Fel " + error);
    }
}