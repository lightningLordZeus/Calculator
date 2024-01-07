const display = document.getElementById("display");

let lastInputIsOperator = false;
let lastTimeCalculated = false;
let operatorWasUsed = false;

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

    if (numbers.includes(lastChar) && input === ".") {
      const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
      if (lastNumber.includes(".")) {
        return;
      }
    }

    if (isOperator(input)) {
      operatorWasUsed = true;
    }

    if (operatorWasUsed && numbers.includes(numbers) && input !== "0") {
      operatorWasUsed = false;
    }

    if (operatorWasUsed && lastChar === "0" && numbers.includes(input)) {
      display.value = display.value.slice(0, -1);
      operatorWasUsed = false;
    }

    if (lastChar === "." && input === ".") {
      return;
    }

    if (
      (display.value === "0" &&
        input !== "." &&
        !isOperator(input) &&
        input !== "%" &&
        input !== "!") ||
      ((display.value === "error" ||
        display.value === "NaN" ||
        display.value === "Infinity") &&
        !isOperator(input) &&
        input !== "%" &&
        input !== "!") ||
      (lastTimeCalculated &&
        !isOperator(input) &&
        input !== "%" &&
        input !== "." &&
        input !== "!")
    ) {
      display.value = input;
    } else if (
      (display.value === "error" ||
        display.value === "NaN" ||
        display.value === "Infinity") &&
      (isOperator(input) || input === "%" || input === "!")
    ) {
      return;
    } else if (
      papapa.includes(lastChar) &&
      !papapa.includes(input) &&
      numbers.includes(input)
    ) {
      display.value += "*" + input;
    } else if (
      input === "(" &&
      (numbers.includes(lastChar) || lastChar === "!")
    ) {
      display.value += "*" + input;
    } else {
      display.value += input;
    }

    lastTimeCalculated = false;
  }

  lastInputIsOperator = isOperator(input);
}

function factorial(input) {
  if (Number.isInteger(input) && input >= 0) {
    if (input === 0 || input === 1) {
      return 1;
    } else {
      return input * factorial(input - 1);
    }
  } else {
    return NaN;
  }
}

function clearDisplay() {
  display.value = "0";
  lastInputIsOperator = false;
}

function clearLastChar() {
  if (
    display.value.length === 1 ||
    display.value === "error" ||
    display.value === "NaN" ||
    display.value === "Infinity"
  ) {
    display.value = "0";
  } else {
    display.value = display.value.slice(0, -1);
  }

  const lastChar = display.value.slice(-1);
  lastInputIsOperator = isOperator(lastChar);
}

function calculate() {
  try {
    let expression = display.value;

    expression = expression.replace(
      /(\d+(\.\d+)?)!/g,
      function (match, number) {
        if (Number.isInteger(parseFloat(number))) {
          return factorial(parseInt(number));
        } else {
          return "error";
        }
      }
    );

    expression = expression.replace(
      /(\d+(\.\d+)?)%/g,
      function (match, number) {
        return parseFloat(number) / 100;
      }
    );

    const result = eval(expression);

    if (isNaN(result) || result === "Infinity") {
      display.value = "error";
    } else {
      display.value = result;
    }

    lastTimeCalculated = true;
    lastInputIsOperator = false;
  } catch (error) {
    display.value = "error";
    lastInputIsOperator = false;
  }
}
