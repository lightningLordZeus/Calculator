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

    if (numbers.includes(lastChar) && input === ".") {
      const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
      if (lastNumber.includes(".")) {
        return;
      }
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
      (display.value === "error" &&
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
      display.value === "error" &&
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
  try {
    let expression = display.value;

    expression = expression.replace(/(\d+)!/g, function (match, number) {
      return factorial(parseInt(number));
    });

    const tokens = expression.match(/(\d+|\+|\-|\*|\/|\%|\!|\(|\))/g) || [];

    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "%": 2,
      "!": 3,
    };

    const outputQueue = [];
    const operatorStack = [];

    for (const token of tokens) {
      if (token.match(/\d+/)) {
        outputQueue.push(token);
      } else if (isOperator(token)) {
        while (
          operatorStack.length &&
          precedence[operatorStack[operatorStack.length - 1]] >=
            precedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop();
      }
    }

    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }

    const resultStack = [];

    for (const token of outputQueue) {
      if (token.match(/\d+/)) {
        resultStack.push(parseFloat(token));
      } else if (isOperator(token)) {
        const operand2 = resultStack.pop();
        const operand1 = resultStack.pop();

        switch (token) {
          case "+":
            resultStack.push(operand1 + operand2);
            break;
          case "-":
            resultStack.push(operand1 - operand2);
            break;
          case "*":
            resultStack.push(operand1 * operand2);
            break;
          case "/":
            resultStack.push(operand1 / operand2);
            break;
          case "%":
            resultStack.push(operand1 % operand2);
            break;
          default:
            break;
        }
      } else {
        resultStack.push(token);
      }
    }

    display.value = resultStack[0];
    lastTimeCalculated = true;
    lastInputIsOperator = false;
  } catch (error) {
    display.value = "error";
    lastInputIsOperator = false;
  }
}
