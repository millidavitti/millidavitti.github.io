"use strict";

const pick = document.querySelector;

const buttons = document.querySelectorAll("button");

const parent = buttons[0].closest("div");

const secParent = document.querySelector(".section-5").closest("div");

const paras = [...document.querySelectorAll(".para")];

const progressbar = document.querySelector(".load");

// console.log(parent);

const btnHighlight = function (e) {
  e.preventDefault();

  const click = e.target.closest("button");
  if (!click) return;

  buttons.forEach((button) => button.classList.remove("black"));

  click.classList.add("black");
};

const tabbing = function (e) {
  if (e.target.matches("button")) {
    const click = e.target.closest("button");

    paras.forEach((para) => {
      para.classList.add("hide-para");

      if (para.dataset.para === click.dataset.btn) {
        para.classList.remove("hide-para");
      }
    });
  }
};

parent.addEventListener("click", function (e) {
  btnHighlight(e);
  tabbing(e);
  console.log(e.target);
  console.log(e.target.dataset.btn);
});

secParent.addEventListener("click", function (e) {
  btnHighlight(e);
  tabbing(e);
});

parent.addEventListener("mouseout", function () {
  buttons.forEach((button) => button.classList.remove("black"));

  document.body.style.background = "white";
});
secParent.addEventListener("mouseout", function () {
  buttons.forEach((button) => button.classList.remove("black"));

  document.body.style.background = "white";
});

let count = +document.querySelector(".load").style.width;

const randInt = () => Math.floor(Math.random() * 255 + 1);

let load;
const contLoading = function (entries) {
  entries.forEach((entry) => {
    console.log(entry);

    if (!entry.isIntersecting) {
      clearInterval(load);
    } else if (entry.isIntersecting) {
      load = setInterval(() => {
        count++;
        document.querySelector(".load").style.width = `${count}%`;

        if (count === 100) {
          document.querySelector(
            ".load"
          ).style.background = `rgb(${randInt()},${randInt()},${randInt()})`;
          count = 0;
        }
      }, 100);
    }
  });
};

const options = {
  root: null,
  threshold: 0.2,
};

const observer = new IntersectionObserver(contLoading, options);
// observer.observe(document.querySelector(".load"));

// Scroll Progress
const html = document.documentElement;

const scrollProgress = function (e) {
  const scrollHeight = html.scrollHeight;

  const scrollTop = scrollHeight - html.clientHeight;

  const progress = (html.scrollTop / scrollTop) * 100;

  document.querySelector(".load").style.width = `${Math.ceil(progress)}%`;

  if (Math.ceil(progress) === 100 || Math.ceil(progress) === 0) {
    document.querySelector(
      ".load"
    ).style.background = `rgb(${randInt()},${randInt()},${randInt()})`;
  }
};

document.addEventListener("scroll", scrollProgress);

// scrollProgress();
