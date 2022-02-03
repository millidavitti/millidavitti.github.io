"use strict";
const search = document.querySelector("#search");
const address = document.querySelector("#address");
const loc = document.querySelector("#location");
const time = document.querySelector("#timezone");
const continent = document.querySelector("#continent");
const form = document.querySelector("form");
const mapEL = document.querySelector("#map");
let map;

const container = document.querySelector(".container");
// navigator.

// Brownian Defaults
/*
160.202.40.138

163.172.157.7

91.204.251.248

63.151.67.7

45.172.111.5
Heart skips a beat- watch the video
*/
// Dialog Component
const closedState = { closed: true, open: false };
const closedBoxes = [];

class Dialog {
  #error;
  #dialogBox = document.createElement("div");
  #errMsg = document.createElement("p");
  #close = {
    element: document.createElement("div"),
  };
  #overlay = document.createElement("div");

  #closeBox(dialogBox, overlay, e) {
    const close = e.target.closest(".close");
    if (!close) return;

    dialogBox.remove();
    overlay.remove();
    container.style.overflow = "unset";
  }

  constructor(boxName) {
    this.#dialogBox.addEventListener(
      "click",
      this.#closeBox.bind(this, this.#dialogBox, this.#overlay),
      (this.boxName = boxName)
    );
  }

  dialog(err, msg) {
    this.#errMsg.textContent = `${err.message} : ${msg} `;

    this.#dialogBox.classList.add("dialog");
    this.#close.element.classList.add("close");
    this.#overlay.classList.add("overlay");

    container.prepend(this.#dialogBox);
    this.#dialogBox.prepend(this.#close.element);
    this.#close.element.after(this.#errMsg);
    this.#dialogBox.after(this.#overlay);
    container.style.overflow = "hidden";

    this.#error = err.message;

    console.log(this);
  }

  get error() {
    return this.#error;
  }

  set closeColor(color) {
    this.#close.bgc = color;
    this.#close.element.style.backgroundColor = color;
  }

  set dialogColor(color) {
    this.#dialogBox.style.backgroundColor = color;
  }
}

async function getLocation(addy = "91.204.251.248	") {
  try {
    const response = await fetch(
      `https://ip-geo-location.p.rapidapi.com/ip/${addy}?format=json`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "ip-geo-location.p.rapidapi.com",
          "x-rapidapi-key":
            "a16da6dabdmsh83980b2d44fb818p1ee8fbjsna835d4964770",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to get a response ❌");

    return await response.json();
  } catch (err) {
    const msg =
      err.message !== "Failed to fetch"
        ? "Check your input and try again"
        : "Check your internet connection❗";

    const box1 = new Dialog("box1");

    box1.dialog(err, msg);

    console.log();

    /*const dialogBox = `<div class="dialog">
        <div class="close"></div>
        <p>${err.message}: Check your internet connection❗</p>
      </div>
       <div class="overlay"></div>`;
   */
  }
}

async function searchAddy() {
  try {
    const data = await getLocation(search.value);

    const { latitude: lat, longitude: long } = data.location;

    const { ip } = data;

    const { name } = data.country;

    const { timezone } = data.time;

    const { name: cityName } = data.city;

    const { name: contName } = data.continent;

    address.textContent = ip;
    loc.textContent = name;
    time.textContent = timezone;
    continent.textContent = contName;

    map?.remove();
    loadMap(lat, long, cityName);
  } catch (err) {}
}

function timer(sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Server took too long to respond❗❕❗"));
    }, sec);
  });
}

function loadMap(lat, long, cname) {
  map = L.map("map", {
    zoomControl: false,
  }).setView([lat, long], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, long]).addTo(map).bindPopup(cname).openPopup();
}

loadMap(51.505, -0.09, "London");

form.addEventListener("click", (e) => {
  e.preventDefault();
  const button = e.target.closest("button");
  if (!button) return;
  searchAddy();
  search.blur();
});
