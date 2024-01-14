const themeNumbers = document.querySelectorAll(".theme-number");
const screenText = document.querySelector(".screen-text");
const keypadSection = document.querySelector(".keypad-section");
const keys = keypadSection.querySelectorAll("button");
const range = document.querySelector("#range");
const expressions = ["+", "−", "×", "÷"];

let currentValue = "0";

function updateScreenText() {
  screenText.textContent = currentValue;
  localStorage.setItem("screen-text", currentValue);
}

function calculate() {
  const lastDigit = currentValue.slice(-1);
  if (
    Number(lastDigit) &&
    expressions.some((expression) => currentValue.includes(expression))
  ) {
    currentValue = eval(
      currentValue.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
    ).toString();
    updateScreenText();
  }
}

function isOperator(value) {
  return expressions.some((expression) => value === expression);
}

function handleClick(e) {
  let value = e.target.textContent;
  if (currentValue.includes(value) && value === ".") return;
  switch (value) {
    case "DEL":
      if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
      } else {
        currentValue = "0";
      }
      updateScreenText();
      break;
    case "RESET":
      currentValue = "0";
      updateScreenText();
      break;
    case "=":
      calculate();
      break;
    default:
      if (
        value !== "." &&
        isOperator(value) &&
        isOperator(currentValue.slice(-1))
      ) {
        return;
      }
      currentValue =
        currentValue !== "0" ? `${currentValue}${value}` : `${value}`;
      updateScreenText();
      break;
  }
}

function handleNumberClick(e) {
  const value = e.target.dataset.theme || e.target.value;
  updateTheme(value);
}

function updateTheme(value) {
  range.value = value;
  switch (value) {
    case "1":
      document.body.classList.remove("second-theme");
      document.body.classList.remove("third-theme");
      localStorage.setItem("theme", "1");
      break;
    case "2":
      document.body.classList.add("second-theme");
      document.body.classList.remove("third-theme");
      localStorage.setItem("theme", "2");
      break;
    case "3":
      document.body.classList.add("third-theme");
      document.body.classList.remove("second-theme");
      localStorage.setItem("theme", "3");
      break;
    default:
      break;
  }
}

range.addEventListener("change", handleNumberClick);
themeNumbers.forEach((themenumber) =>
  themenumber.addEventListener("click", handleNumberClick)
);
keys.forEach((key) => key.addEventListener("click", handleClick));

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme")) {
    const storedTheme = localStorage.getItem("theme");
    updateTheme(storedTheme);
  }

  if (localStorage.getItem("screen-text")) {
    const savedText = localStorage.getItem("screen-text");
    currentValue = savedText;
    screenText.textContent = currentValue;
  }
});
