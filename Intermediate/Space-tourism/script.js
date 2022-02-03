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

// Functions

async function getData(src) {
  const response = await fetch(src);
  const data = await response.json();
  return await data;
}

function activeTab(data, loopVar, className, e) {
  if (data === loopVar.dataset.data) loopVar.classList.add(className);
  else loopVar.classList.remove(className);
  e.target.classList.add(className);
}

// Nav
header.addEventListener("click", (e) => {
  const menu = e.target.closest(".ham-icon");

  if (!menu) {
  } else {
    menuBtn.classList.toggle("close-icon");
    mobileNav.classList.toggle("show-nav");
  }
});

// Destination

tabWrap?.addEventListener("click", (e) => {
  // Tab Nav
  const tab = e.target.closest(".tabs h3");
  const { destination } = e.target.dataset;
  if (!tab) return;
  tabs.forEach((tab) => {
    activeTab(destination, tab, "active-tab", e);

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
    activeTab(crew, dot, "active-dot", e);

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
    activeTab(tech, tab, "active-tech-tab", e);
    async function pickTech(src) {
      const info = await getData(src);
      const { technology: ship } = info;

      const techh = tab.dataset.tech;

      if (tech === techh) {
        const shipTech = ship[techh];

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
explore?.addEventListener("click", () => destination.link.click());

document
  .querySelector(".logo")
  .addEventListener("click", () => home.link.click());

// Desktop Navigation Component

const nav = document.querySelector("nav");
const main = document.querySelector("main");

class Desk {
  #deskNav = document.createElement("div");
  #menuItems = document.createElement("menu");

  #style = document.styleSheets;

  #cssMedia = {
    tablet: this.#style?.[0].cssRules?.[6],
    desktop: this.#style?.[0].cssRules?.[7],
  };

  #cssDec = {
    tablet: this.#cssMedia.tablet.cssRules?.[3].style,
    desktop: this.#cssMedia.desktop.cssRules?.[1].style,
  };

  #cssRule = {
    tablet: this.#cssMedia.tablet.cssRules?.[3],
    desktop: this.#cssMedia.desktop.cssRules?.[1],
  };

  constructor() {
    const desk = new Desk();
  }

  newNav() {
    this.#deskNav.classList.add(this.cssClass.deskNav);
    this.#menuItems.classList.add("menu-items");

    this.#deskNav.append(this.#menuItems);

    return { nav: this.#deskNav, object: this };
  }

  add(href, text) {
    const list = document.createElement("li");
    const link = document.createElement("a");

    list.classList.add("menu-item");
    list.append(link);
    this.#menuItems.append(list);
    link.textContent = text;
    link.href = href;

    return { link: link, object: this };
  }

  setPropDesk(property, value) {
    this.#cssDec.desktop.setProperty(property, value);
    return this;
  }

  setPropTab(property, value) {
    this.#cssDec.tablet.setProperty(property, value);
    return this;
  }

  cssClass = {
    deskNav: this.#cssRule.desktop.selectorText.replace(".", ""),
  };
}

// const desk = new Desk();

console.log(document.styleSheets[0]);

nav.append(desk.newNav().nav);

const home = desk.add("./index.html", "home");
const destination = desk.add("./destination-moon.html", "destination");

desk
  .add("./crew-commander.html", "crew")
  .object.add("./technology-vehicle.html", "technology");

desk
  .setPropDesk("display", "inherit")
  .setPropDesk("border", "7px solid darkcyan")
  .setPropDesk("outline", "5px solid darkblue");

desk
  .setPropTab("display", "inherit")
  .setPropTab("border", "7px solid darkblue")
  .setPropTab("outline", "5px solid darkcyan");

const style = document.styleSheets[0];
const { cssRules } = style;
const { cssRules: secRule } = cssRules[5];

// console.log(secRule);

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Iteration Protocol
class Log {
  constructor() {
    this.messages = [];
    this.mno = { m: 90, n: 91, o: 92 };
  }
  add(message) {
    this.messages.push({ message, timestamp: Date.now() });
  }

  [Symbol.iterator]() {
    let index = 0;
    const mno = Object.values(this.messages);
    return {
      next() {
        if (index >= mno.length) return { value: undefined, done: true };
        return { value: mno[index++], done: false };
      },
    };
  }
}

const log = new Log();

log.add("first day at sea");
log.add("spotted whale");
log.add("spotted another vessel");

console.log(log);

try {
  for (const entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
  }
} catch (err) {
  console.error(err);
}

const arr = [10, 20, 30, 40, 50, 60, 70, 80];

// Generators

function* rainbow() {
  // the asterisk marks this as a generator
  yield "red";
  yield "orange";
  yield "yellow";
  yield "green";
  yield "blue";
  yield "indigo";
  yield "violet";
}
const it = rainbow();
console.log(it);

console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log(it.return());

console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log(it);

function* interrogate() {
  const name = yield "What is your name?";
  const color = yield "What is your favorite color?";
  yield `${name}'s favorite color is ${color}.`;
  return;
}

const int = interrogate();
console.log(int);
console.log(int.next().value);
console.log(int.next("Donald").value);
console.log(int.next("Darkgreen").value);

console.log(int);
