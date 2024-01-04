const display = document.getElementById("display");

let lastInputIsOperator = false;
let lastTimeCalculated = false;

function isOperator(char) {
  const operators = ["+", "-", "*", "/"];
  return operators.includes(char);
}

function appendToDisplay(input) {
  if (lastInputIsOperator && isOperator(input)) {
    display.value = display.value.slice(0, -1) + input;
  } else {
    const lastChar = display.value.slice(-1);
    const papapa = ["%", ")", "!"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (lastChar === "." && input === ".") {
      return;
    }

    if (
      (display.value === "0" &&
        input !== "." &&
        !isOperator(input) &&
        input !== "%" &&
        input !== "!") ||
      (display.value === "error" &&
        !isOperator(input) &&
        input !== "%" &&
        input !== "!") ||
      (lastTimeCalculated &&
        !isOperator(input) &&
        input !== "%" &&
        input !== "." && input !== "!")
    ) {
      display.value = input;
    } else if (
      display.value === "error" &&
      (isOperator(input) || input === "%" || input === "!")
    ) {
      return;
    } else if (papapa.includes(lastChar) && !papapa.includes(input)) {
      display.value += "*" + input;
    } else if (input === "(" && numbers.includes(lastChar)) {
      display.value += "*" + input;
    } else {
      display.value += input;
    }

    lastTimeCalculated = false;
  }

  lastInputIsOperator = isOperator(input);
}

function factorial(input) {
  if (input === 0 || input === 1) {
    return 1;
  } else {
    return input * factorial(input - 1);
  }
}

function clearDisplay() {
  display.value = "0";
  lastInputIsOperator = false;
}

function clearLastChar() {
  if (display.value.length === 1 || display.value === "error") {
    display.value = "0";
  } else {
    display.value = display.value.slice(0, -1);
  }

  const lastChar = display.value.slice(-1);
  lastInputIsOperator = isOperator(lastChar);
}

function calculate() {
  const lastChar = display.value.slice(-1);

  if (isOperator(lastChar) || lastChar === ".") {
    return;
  } else {
    try {
      if (display.value.includes("!")) {
        const number = parseInt(display.value.slice(0, -1));
        if (!isNaN(number)) {
          display.value = factorial(number);
        } else {
          display.value = "error";
        }
      } else if (display.value.includes("%")) {
        display.value = eval(display.value.replace(/%/g, "/100"));
      } else {
        display.value = eval(display.value);
      }

      lastTimeCalculated = true;
      lastInputIsOperator = false;
    } catch (error) {
      display.value = "error";
      lastInputIsOperator = false;
    }
  }
}
