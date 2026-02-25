"use strict";
import { Chart } from 'chart.js/auto';

document.addEventListener("DOMContentLoaded", async () => {
    loadData()
});

async function loadData() {
    const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

    //Anropa och läs ut data
    try {
        const response = await fetch(url);
        const data = await response.json();

        createChartStaple(data);
        createChartPie(data);

    } catch (error) {
        console.error("Fel " + error);
    }
}

/**
 * @typedef {Object} Data
 * @property {string} type - Kurs eller program
 * @property {string} name - Kurs- eller programnamn
 * @property {number} applicantsTotal - Totalt antal sökande
*/

/**
 * Funktion för att skapa stapeldiagram
 * @param {Data[]} data
 */
function createChartStaple(data) {
    const courses = data.filter(data => data.type === "Kurs")
    const sorted = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    const mostSix = sorted.slice(0, 6);

    const labels = mostSix.map(data => data.name);
    const values = mostSix.map(data => data.applicantsTotal);

    const ctx = document.getElementById('staple');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Antal sökande',
                data: values,
                borderWidth: 1,
                backgroundColor: 'brown'
            }]
        },
    })
}

/**
 * Funktion för att skapa cirkeldiagram
 * @param {Data[]} data
 */
function createChartPie(data) {
    const courses = data.filter(data => data.type === "Program")
    const sorted = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    const mostFive = sorted.slice(0, 5);

    const labels = mostFive.map(data => data.name);
    const values = mostFive.map(data => data.applicantsTotal);

    const ctx = document.getElementById('pie');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Antal sökande',
                data: values,
                backgroundColor: ['brown', 'blue', 'green', 'yellow', 'orange']
            }]
        },
    })
}