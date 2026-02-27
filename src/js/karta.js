"use strict";

function initMap() {
    const position = { lat: 57.875089, lng: 11.963767 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: position,
    });

}
