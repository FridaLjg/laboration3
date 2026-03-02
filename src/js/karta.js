"use strict";
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 57.875089, lng: 11.963767 },
        zoom: 10
    });

    //Sökfält
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        const quest = searchInput.value;
        searchPlace(quest);
    });
}

async function searchPlace(quest) {
    const url = "https://places.googleapis.com/v1/places:searchText";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": "AIzaSyD1sJROu-pvac4_UNZTBRMhOopqqpabAzQ",
                "X-Goog-FieldMask": "places.displayName,places.location",
            },
            body: JSON.stringify({
                textQuery: quest,
            }),
        });

        const data = await response.json();
        Result(data);

    } catch (error) {
        console.error("Fel: ", error);
    }
}

function Result(data) {
    const place = data.places[0];

    const pos = {
        lat: place.location.latitude,
        lng: place.location.longitude,
    };

    map.setCenter(pos);
    map.setZoom(13);

    //Markör
    marker = new google.maps.Marker({
        position: pos,
        map: map
    });
}

window.initMap = initMap;