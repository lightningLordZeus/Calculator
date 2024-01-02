const display = document.getElementById("display");

let lastInputIsOperator = false;

function isOperator(char) {
  const operators = ["+", "-", "*", "/"];
  return operators.includes(char);
}

function appendToDisplay(input) {
  if (lastInputIsOperator && isOperator(input)) {
    display.value = display.value.slice(0, -1) + input;
  } else {
    const lastChar = display.value.slice(-1);

    if (lastChar === "." && input === ".") {
      return;
    }

    if (
      (display.value === "0" && input !== "." && !isOperator(input)) ||
      display.value === "error"
    ) {
      display.value = input;
    } else {
      display.value += input;
    }
  }

  lastInputIsOperator = isOperator(input);
}

function clearDisplay() {
  display.value = "0";
  lastInputIsOperator = false;
}

function clearLastChar() {
  if (display.value.length === 1) {
    display.value = "0";
  } else {
    display.value = display.value.slice(0, -1);
  }

  const lastChar = display.value.slice(-1);
  lastInputIsOperator = isOperator(lastChar);
}

function calculate() {
  const lastChar = display.value.slice(-1);

  if (isOperator(lastChar)) {
    return;
  } else {
    try {
      display.value = eval(display.value);
      lastInputIsOperator = false;
    } catch (error) {
      display.value = "error";
      lastInputIsOperator = false;
    }
  }
}
