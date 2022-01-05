"use strict";

const string = document.getElementById("string");
const checkBtn = document.querySelector(".palindrome button");
const result = document.querySelector(".result p");
const history = document.querySelector(".history ol");
const historyItems = document.querySelector(".two");
const palindrome = document.querySelector(".palindrome");
const sortbtn = document.querySelector(".sort");

const historyArray = [];

history.innerHTML = "";

const isPalindrome = function (str) {
  str = String(str).toLowerCase();
  const strArray = [...str];
  //   console.log(strArray);
  let revStr = "";
  for (const letters of strArray.reverse()) {
    revStr += letters;
  }
  if (str === revStr) {
    return true;
  } else {
    return false;
  }
};

const capitalise = function (str) {
  return str[0].toLowerCase() + str.slice(1);
};

const timer = function () {
  setTimeout(() => {
    result.textContent = "";
    palindrome.style.background = "white";
  }, 10000);
};

// Update History

const udpdateHistory = function (array) {
  history.innerHTML = "";
  const arraySort = sort ? "beforeend" : "afterbegin";
  array.forEach((hist, index) => {
    const clas = isPalindrome(hist) ? "one" : "two";
    const tabs = `<li class='${clas} grab'><span>${++index}</span>  ${capitalise(
      hist
    )}</li>`;
    history.insertAdjacentHTML(arraySort, tabs);
  });
};

// console.log(historyArray);

// Input event handler
string.addEventListener("click", () => {
  result.textContent = "";
  palindrome.style.background = "white";
});

// Palindrome Checker
checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const str = string.value.trim();

  if (str !== "" && str.length >= 3) {
    if (isPalindrome(str)) {
      historyArray.push(str);
      result.textContent = `${str.toUpperCase()} is a palindrome`;
      palindrome.style.background = "rgba(0, 139, 139, 0.888)";

      result.style.color = "white";

      timer();
    } else {
      historyArray.push(str);
      result.textContent = `${str.toUpperCase()} is not a palindrome`;
      palindrome.style.background = "crimson";
      result.style.color = "white";

      timer();
    }
  } else {
    str.length === 0 && str === ""
      ? (result.textContent = "Your word, please?")
      : (result.textContent = "");
    result.style.color = "black";

    setTimeout(() => {
      result.textContent = "";
    }, 10000);
  }
  // Error < 3 characters
  str.length < 3 && str !== ""
    ? (document.querySelector("form p").textContent =
        "Must be 3 characters or more!")
    : (document.querySelector("form p").textContent = "");
  string.value = "";
  string.blur();

  //   history
  udpdateHistory(historyArray);
});

// Sorting

let sort = false;
sortbtn.addEventListener("click", function () {
  sort = !sort;
  sort
    ? (sortbtn.style.background = "crimson")
    : (sortbtn.style.background = "darkcyan");
  udpdateHistory(historyArray);
});

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

console.log(calcMultilication(5, 4));
console.log(calcDivision(2, 0));
console.log(calcAddition(20, 10));
console.log(calcSubtraction(50, 10));
console.log(calcSubtraction(10, 50));

// historyItems.addEventListener("click", () => {
//   historyItems.style.display = "none";
// });
