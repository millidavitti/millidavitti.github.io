"use strict";

// History
const overlay = document.getElementById("overlay");
const histBtn = document.querySelector(".hist-btn");
const histList = document.querySelector(".hist-list");
const histContainer = document.querySelector(".hist-container");
const clearBtn = document.getElementById("clear");

// Operators
const percent = document.getElementById("percent");
const CE = document.getElementById("ce");
const C = document.getElementById("c");
const del = document.getElementById("del");
const oneth = document.getElementById("oneth");
const square = document.getElementById("square");
const squareRoot = document.getElementById("square-root");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const subtract = document.getElementById("subtract");
const add = document.getElementById("add");
const equals = document.getElementById("equals");

// Digi Pad
const digiPad = document.querySelector(".keypad");

const plusMinus = document.getElementById("plus-minus");

const point = document.getElementById("point");

// Input
const screen = document.getElementById("number");
const streakScreen = document.querySelector(".input-streak");

// Arrays
const digitArray = []; //joins the display array
const digit2 = []; //joins the display array
let display = []; //used to capture/show input numbers
let streakArray = [];
let argument = []; //Used for arithmetic opeartion (+display.join(''))
let states = []; //Captures states e.g add
let store;

// Functions
const calcMultilication = function (...arg) {
  return arg.reduce((acc, curr) => acc * curr, 1);
};

const calcDivision = function (...arg) {
  let result;
  arg.forEach((curr, i, arr) => {
    result = arr[0] / arr[1];
  });
  return result;
};

const calcAddition = function (...arg) {
  return arg.reduce((acc, curr) => acc + curr, 0);
};

const calcSubtraction = function (...arg) {
  let result;
  arg.forEach((curr, i, arr) => {
    result = arr[0] - arr[1];
  });
  return result;
};

const calcSquare = function (arg) {
  return arg ** 2;
};

const calcSqrt = function (arg) {
  return arg ** (1 / 2);
};

const calcOneth = function (arg) {
  return 1 / arg;
};

const bridge = function (arg) {
  switch (arg) {
    case "add":
      argument.push(...digitArray);
      screen.value = calcAddition(...argument);
      argument = [];
      argument.push(+screen.value);
      // Reset
      digitArray.pop();

      break;
    case "divide":
      argument.push(...digitArray);
      screen.value = argument.length > 1 ? calcDivision(...argument) : argument;
      argument = [];
      argument.push(+screen.value);
      // Reset
      digitArray.pop();
      break;
    case "multiply":
      argument.push(...digitArray);
      screen.value = calcMultilication(...argument);
      argument = [];
      argument.push(+screen.value);
      // Reset
      digitArray.pop();
      break;
    case "subtract":
      argument.push(...digitArray);
      screen.value =
        argument.length > 1 ? calcSubtraction(...argument) : argument;
      argument = [];
      argument.push(+screen.value);
      // Reset
      digitArray.pop();
      break;
    case "equals":
      digitArray.push(...argument);
      argument.pop();
      argument.push(...digitArray);
      (() => {
        display = [];
        streakArray = [];
        screen.value = "";
        streakScreen.textContent = "";
        argument = [];
      })();
      streakArray.push(...digitArray);
      digit2.pop();

    default:
      console.log("def");
      // eqEvent();
      break;
  }
};

const eqEvent = function () {
  states.push("equals");
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(...digit2);
  streakArray.at(-1) === "+" ||
  streakArray.at(-1) === "-" ||
  streakArray.at(-1) === "*" ||
  streakArray.at(-1) === "÷"
    ? streakArray
    : streakArray.push("=");

  console.log("Equals streak:", streakArray);

  // Sign Change
  streakArray.at(-1) !== "=" || streakArray.at(-1) === `√(${digit2.at(0)})`
    ? (streakArray[streakArray.length - 1] = "=")
    : streakArray;

  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");
  display = [];

  digitArray.pop();
  digit2.pop();

  // History Update
  const updateHist = `<p>${streakScreen.textContent}</p>
            <p>${screen.value}</p>`;
  histContainer.insertAdjacentHTML("afterbegin", updateHist);
};

const addEvent = function () {
  states.push("add");
  // State management
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(...digit2);

  streakArray.at(-1) === "+" ||
  streakArray.at(-1) === "-" ||
  streakArray.at(-1) === "*" ||
  streakArray.at(-1) === "÷"
    ? streakArray
    : streakArray.push("+");

  console.log("Add Streak:", streakArray);

  // Sign Change
  streakArray.at(-1) !== "+"
    ? (streakArray[streakArray.length - 1] = "+")
    : streakArray;

  console.log("Mutant Streak:", streakArray);

  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");

  display = [];

  // Positive Reduction
  argument.push(...digitArray);
  screen.value = calcAddition(...argument);
  argument = [];
  argument.push(+screen.value);
  // // Reset
  digitArray.pop();
  digit2.pop();
};

const subEvent = function () {
  states.push("subtract");

  // State management
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(...digit2);

  streakArray.at(-1) === "+" ||
  streakArray.at(-1) === "-" ||
  streakArray.at(-1) === "*" ||
  streakArray.at(-1) === "÷"
    ? streakArray
    : streakArray.push("-");

  console.log("Sub Streak:", streakArray);

  // Sign Change]

  streakArray.at(-1) !== "-"
    ? (streakArray[streakArray.length - 1] = "-")
    : streakArray;

  console.log("Mutant Streak:", streakArray);

  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");
  display = [];

  // Negative Reduction
  argument.push(...digitArray);
  screen.value = argument.length > 1 ? calcSubtraction(...argument) : argument;
  argument = [];
  argument.push(+screen.value);
  // Reset
  digitArray.pop();
  digit2.pop();
};

const mulEvent = function () {
  states.push("multiply");
  // State management
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(...digit2);

  streakArray.at(-1) === "+" ||
  streakArray.at(-1) === "-" ||
  streakArray.at(-1) === "*" ||
  streakArray.at(-1) === "÷"
    ? streakArray
    : streakArray.push("*");

  console.log("Mul Streak:", streakArray);

  // Sign Change
  streakArray.at(-1) !== "*"
    ? (streakArray[streakArray.length - 1] = "*")
    : streakArray;

  console.log("Mutant Streak:", streakArray);

  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");
  display = [];

  // Multiply
  argument.push(...digitArray);
  screen.value = calcMultilication(...argument);
  argument = [];
  argument.push(+screen.value);
  // Reset
  digitArray.pop();
  digit2.pop();
};

const divEvent = function () {
  states.push("divide");

  // State management
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(...digit2);

  streakArray.at(-1) === "+" ||
  streakArray.at(-1) === "-" ||
  streakArray.at(-1) === "*" ||
  streakArray.at(-1) === "÷"
    ? streakArray
    : streakArray.push("÷");

  console.log("Div Streak:", streakArray);

  // Sign Change
  streakArray.at(-1) !== "÷"
    ? (streakArray[streakArray.length - 1] = "÷")
    : streakArray;

  console.log("Mutant Streak:", streakArray);

  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");
  display = [];

  // Fractional Reduction

  argument.push(...digitArray);
  screen.value = argument.length > 1 ? calcDivision(...argument) : argument;
  argument = [];
  argument.push(+screen.value);
  // Reset
  digitArray.pop();
  digit2.pop();
};

const squareEvent = function () {
  // State management
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(`Sqr(${digit2[0]})`);

  // Sign Change

  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");
  display = [];

  // Square
  // argument.push(...digitArray);
  screen.value = calcSquare(...digit2);
  argument.push(calcSquare(...digit2));
  // Reset
  digitArray.pop();
  digit2.pop();
};

const sqRootEvent = function () {
  // State management
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(`√(${digit2.at(0)})`);

  // Sign Change
  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");
  display = [];

  // Square Root
  argument.push(...digit2);
  screen.value = calcSqrt(...argument);
  argument = [];
  argument.push(+screen.value);
  // Reset
  digitArray.pop();
  digit2.pop();
};

const onethEvent = function () {
  // states.push("add");
  // State management
  bridge(states.at(-2));
  // Streak Screen
  streakArray.push(`1/${digit2.pop()}`);

  console.log("Oneth Streak:", streakArray);

  streakScreen.textContent = streakArray.toString().replaceAll(",", " ");

  display = [];

  // Positive Reduction
  argument.push(...digitArray);
  screen.value = calcOneth(...argument);
  argument = [];
  argument.push(+screen.value);
  // // Reset
  digitArray.pop();
  digit2.pop();
};

// Implemetation

// DigitPad Event handlers

digiPad.addEventListener("click", function (e) {
  if (e.target.matches(".digi-pad")) {
    if (e.target.matches("#point")) return;
    display.push(e.target.dataset.value);
    digitArray.pop();
    digit2.pop();
    digitArray.push(+display.join(""));
    digit2.push(+display.join(""));
    screen.value = display.join("");
  } else if (e.target.matches(".operator")) {
    switch (e.target.id) {
      case "equals":
        eqEvent();
        break;
      case "add":
        addEvent();
        break;
      case "subtract":
        subEvent();
        break;
      case "multiply":
        mulEvent();
        break;
      case "divide":
        divEvent();
        break;
      default:
        break;
    }
  }
});

C.addEventListener("click", () => {
  display = [];
  digitArray.pop();
  digit2.pop();
  streakArray = [];
  screen.value = "";
  streakScreen.textContent = "";
  argument = [];
});

CE.addEventListener("click", () => {
  display = [];
  screen.value = "";
  argument = [];
});

del.addEventListener("click", (e) => {
  display.pop();
  digitArray.pop();
  digitArray.push(+display.join(""));
  screen.value = display.join("");
});

point.addEventListener("click", () => {
  if (display.includes(".")) display;
  else display.push(".");
  digitArray.pop();
  digitArray.push(+display.join(""));
  screen.value = display.join("");
});

plusMinus.addEventListener("click", () => {
  if (display.includes("-")) display.shift("+");
  else display.unshift("-");
  console.log(display);
  digitArray.pop();
  digit2.pop();
  digitArray.push(+display.join(""));
  digit2.push(+display.join(""));
  screen.value = display.join("");
});

// Operations

// Square
square.addEventListener("click", squareEvent);

squareRoot.addEventListener("click", sqRootEvent);

// Oneth
oneth.addEventListener("click", onethEvent);

// History Handlers
const show = () => {
  overlay.style.display = "block";
  overlay.style.opacity = "1";

  histList.style.display = "flex";
  histList.style.opacity = "1";
};

const hide = () => {
  overlay.style.display = "none";
  overlay.style.opacity = "0";

  histList.style.display = "none";
  histList.style.opacity = "0";
};

histBtn.addEventListener("click", show);

overlay.addEventListener("click", hide);

clearBtn.addEventListener("click", () => {
  histContainer.innerHTML = "";
});

// Keydown events

document.addEventListener("keydown", (e) => {
  // Digit Pad
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  nums.forEach((val) => {
    if (+e.key === val) {
      display.push(val);
      digitArray.pop();
      digit2.pop();
      digitArray.push(+display.join(""));
      digit2.push(+display.join(""));
      screen.value = display.join("");
    }
  });

  // Operators

  if (e.key === "+") addEvent();
  else if (e.key === "-") subEvent();
  else if (e.key === "*") mulEvent();
  else if (e.key === "/") divEvent();
  else if (e.key === "Enter") eqEvent();
  else if (e.key === "Escape") {
    display = [];
    streakArray = [];
    screen.value = "";
    streakScreen.textContent = "";
    argument = [];
  } else if (e.key === "Backspace") {
    display.pop();
    digitArray.pop();
    digitArray.push(+display.join(""));
    screen.value = display.join("");
  } else if (e.key === ".") {
    display.includes(".") ? display : display.push(".");
    digitArray.pop();
    digitArray.push(+display.join(""));
    screen.value = display.join("");
  } else if (e.key === "h") {
    overlay.style.display === "block" ? hide() : show();
  }
});
