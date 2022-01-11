"use strict";

const menuBtn = document.querySelector(".ham-icon");
const mobileNav = document.querySelector(".mobile-nav");
const header = document.querySelector("header");
const explore = document.querySelector(".explore-btn");
const menuItems = document.querySelectorAll(".menu-item");

// Destination

// Tabs
const tabWrap = document.querySelector(".tabs");
const tabs = document.querySelectorAll(".tabs h3");

// Content
const destinationHead = document.querySelector(".destination-content h1");
const destinationBody = document.querySelector(".destination-content p");
const destinationImg = document.querySelector(".destination-img");
const distance = document.querySelector(".distance p");
const time = document.querySelector(".time p");

// Crew
const dotWrap = document.querySelector(".dots");
const dots = document.querySelectorAll(".dot");

// Content

const crewRole = document.querySelector(".crew-info h3");
const crewName = document.querySelector(".crew-info h1");
const crewBody = document.querySelector(".crew-info p");
const crewImg = document.querySelector(".crew-img");

// Tech
const techTabWrap = document.querySelector(".tech-tabs");
const techTabs = document.querySelectorAll(".tech-tab");

// Content
const techHead = document.querySelector(".tech-content h1");
const techBody = document.querySelector(".tech-content p");
const techImg = document.querySelector(".tech-img");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Nav
header.addEventListener("click", (e) => {
  // e.preventDefault();
  //   console.log(e.target);
  const menu = e.target.closest(".ham-icon");

  if (!menu) {
  } else {
    menuBtn.classList.toggle("close-icon");
    mobileNav.classList.toggle("show-nav");
  }
});

// Destination

async function getData(src) {
  const response = await fetch(src);
  const data = await response.json();
  return await data;
}

// Destination

tabWrap?.addEventListener("click", (e) => {
  // Tab Nav
  const tab = e.target.closest(".tabs h3");
  const { destination } = e.target.dataset;
  if (!tab) return;
  tabs.forEach((tab) => {
    if (destination === tab.dataset.destination)
      tab.classList.add("active-tab");
    else tab.classList.remove("active-tab");
    e.target.classList.add("active-tab");

    async function pickDestination(src) {
      const info = await getData(src);
      const { destinations: dest } = info;

      const planet = tab.dataset.destination;
      if (destination === planet) {
        const destPlanet = dest[planet];

        destinationImg.style.background = `url(${destPlanet.images.png}) no-repeat center`;
        destinationImg.style.backgroundSize = "contain";

        destinationHead.textContent = destPlanet.name;
        destinationBody.textContent = destPlanet.description;
        distance.textContent = destPlanet.distance;
        time.textContent = destPlanet.travel;
      }
    }
    pickDestination("./data.json");
  });
});

// Crew

dotWrap?.addEventListener("click", (e) => {
  const dot = e.target.closest(".dot");
  const { crew } = e.target.dataset;
  if (!dot) return;

  dots.forEach((dot) => {
    if (crew === dot.dataset.crew) dot.classList.add("active-dot");
    else dot.classList.remove("active-dot");

    e.target.classList.add("active-dot");

    async function meetCrew(src) {
      const info = await getData(src);
      const { crew: crewObj } = info;
      const member = dot.dataset.crew;

      if (crew === member) {
        const crewMember = crewObj[member];

        crewImg.style.background = `url(${crewMember.images.png}) no-repeat center`;
        crewImg.style.backgroundSize = "contain";
        crewRole.textContent = crewMember.role;
        crewName.textContent = crewMember.name;
        crewBody.textContent = crewMember.bio;
      }
    }
    meetCrew("./data.json");
  });
});

// Tech

techTabWrap?.addEventListener("click", (e) => {
  const tab = e.target.closest(".tech-tab");
  const { tech } = e.target.dataset;
  if (!tab) return;
  techTabs.forEach((tab) => {
    if (tech === tab.dataset.destination) tab.classList.add("active-tech-tab");
    else tab.classList.remove("active-tech-tab");
    e.target.classList.add("active-tech-tab");

    async function pickTech(src) {
      const info = await getData(src);
      const { technology: ship } = info;

      const techh = tab.dataset.tech;
      if (tech === techh) {
        const shipTech = ship[tech];

        techImg.style.background = `url(${shipTech.images.landscape}) no-repeat center`;
        techImg.style.backgroundSize = "contain";

        techHead.textContent = shipTech.name;
        techBody.textContent = shipTech.description;
      }
    }
    pickTech("./data.json");
  });
});

// Explore
explore?.addEventListener("click", (e) => {
  document.querySelector(".menu-item:nth-of-type(2) a").click();
});
