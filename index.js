const themeNumbers = document.querySelectorAll(".theme-number");
const sliderTrack = document.querySelector(".slider-track");
const screenText = document.querySelector(".screen-text");
const keypadSection = document.querySelector(".keypad-section");
const keys = keypadSection.querySelectorAll("button");
const expressions = ["+", "-", "x", "/"];

let currentValue = "0";

function updateScreenText() {
  screenText.textContent = currentValue;
}

function calculate() {
  const lastDigit = currentValue.slice(-1);
  if (
    Number(lastDigit) &&
    expressions.some((expression) => currentValue.includes(expression))
  ) {
    currentValue = eval(currentValue.replace("x", "*")).toString();
    updateScreenText();
  }
}

function handleClick(e) {
  let value = e.target.textContent;
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
      if (!Number(value.slice(-1)) && !Number(currentValue.slice(-1))) return;
      currentValue =
        currentValue !== "0" ? `${currentValue}${value}` : `${value}`;
      updateScreenText();
      break;
  }
}

function handleNumberClick(e) {
  changeTheme(e.target.dataset.theme);
}

function changeTheme(value) {
  switch (value) {
    case "second":
      document.body.classList.add("second-theme");
      document.body.classList.remove("third-theme");
      break;
    case "third":
      document.body.classList.add("third-theme");
      document.body.classList.remove("second-theme");
      break;
    default:
      document.body.classList.remove("second-theme");
      document.body.classList.remove("third-theme");
      break;
  }
}

function handleThemeToggle(e) {
  const clickLocationInsideTrack = e.x - this.offsetLeft;
  if (clickLocationInsideTrack < (1 / 3) * this.offsetWidth) {
    changeTheme("first");
  } else if (clickLocationInsideTrack < (2 / 3) * this.offsetWidth) {
    changeTheme("second");
  } else {
    changeTheme("third");
  }
}

keys.forEach((key) => key.addEventListener("click", handleClick));
themeNumbers.forEach((themenumber) =>
  themenumber.addEventListener("click", handleNumberClick)
);
sliderTrack.addEventListener("click", handleThemeToggle);
