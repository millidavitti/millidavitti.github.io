"use script";

console.log("Lets do this!");

// Variables

const hamIcon = document.querySelector(".ham-icon");
const closeIcon = document.querySelector(".close-icon");
const header = document.querySelector("header");
const mobNav = document.querySelector(".mobile-nav");
const menuHead = document.querySelector(".menu-head");
const mobileItems = document.querySelectorAll(".menu-items");
const deskItems = document.querySelectorAll(".menu-items-desk");
const deskItem = document.querySelector(".menu-items-desk");

// deskItem.closest(".desk-nav-menu").style.outline = "auto";
function headerEventListener(e) {
  //   console.log(e.target);
  //   Ham
  if (e.target.matches(".ham-icon") || e.target.matches(".close-icon")) {
    mobNav.classList.toggle("show-mobile-nav");
    hamIcon.classList.toggle("hide-ham-icon");
    closeIcon.classList.toggle("show-close-icon");
  }

  //   Mobile
  if (e.target.matches(".menu-head")) {
    mobileItems.forEach((ul) => {
      ul.classList.remove("show-menu-items");
      if (ul.dataset.menu === e.target.dataset.menu) {
        ul.classList.toggle("show-menu-items");
      }
    });
  }

  //   Desktop
  if (e.target.matches(".menu-head-desk")) {
    ////
    deskItems.forEach((ul) => {
      if (ul.dataset.desk === e.target.dataset.desk) {
        ul.classList.toggle("show-menu-items-desk");
      } else ul.classList.remove("show-menu-items-desk");
    });
  } else if (e.target.matches("a"))
    deskItems.forEach((ul) => ul.classList.remove("show-menu-items-desk"));

  if (!e.target.matches(".menu-head-desk")) {
    deskItems.forEach((ul) => ul.classList.remove("show-menu-items-desk"));
  }
}

header.addEventListener("click", headerEventListener);

// Nav Menu
function deskMenuListner(e) {
  if (e.target.matches(".menu-head-desk")) {
    // console.log(e.target.closest("div"));
    // console.log(e.target);
    ////
    deskItems.forEach((ul) => {
      if (!e.target.matches(".menu-head-desk"))
        ul.classList.remove("show-menu-items-desk");
      if (ul.dataset.desk === e.target.dataset.desk) {
        ul.classList.add("show-menu-items-desk");
      } else ul.classList.remove("show-menu-items-desk");
    });
  }
}

// Shows menu items
deskItem.closest("nav").addEventListener("mouseover", deskMenuListner);

deskItems.forEach((menuItem) =>
  menuItem.addEventListener("mouseleave", function (e) {
    console.log(e.currentTarget);

  
    e.target.classList.remove("show-menu-items-desk");
  })
);
