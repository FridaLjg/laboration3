"use strict";

function clock() {
    const timeNow = new Date();
    document.getElementById("clock").textContent = timeNow.toLocaleTimeString();
}

setInterval(clock, 1000);
clock();