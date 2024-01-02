const display = document.getElementById("display");

let lastInputIsOperator = false;

function appendToDisplay(input) {
  const operators = ["+", "-", "*", "/"];

  if (
    lastInputIsOperator &&
    operators.includes(input)
  ) {

    display.value = display.value.slice(0, -1) + input;
  } else {
    const lastChar = display.value.slice(-1);
    
    if (lastChar === "." && input === ".") {
      return;
    }

    if (
      (display.value === "0" &&
        input !== "." &&
        !operators.includes(input)) || display.value === "error"
    ) {
      display.value = input;
    } else {
      display.value += input;
    }
  }

  lastInputIsOperator = operators.includes(input);
}

function clearDisplay() {
  display.value = "0";
  lastInputIsOperator = false;
}

function calculate() {
  try {
    display.value = eval(display.value);
    lastInputIsOperator = false;
  } catch (error) {
    display.value = "error";
    lastInputIsOperator = false;
  }
}
