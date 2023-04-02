const result = document.querySelector("#result"),
  expression = document.querySelector("#expression"),
  num = document.querySelectorAll(".number:not(.equals)"),
  operation = document.querySelectorAll(".operation"),
  equals = document.querySelector(".equals"),
  clear = document.querySelector("#clear"),
  ce = document.querySelector("#ce");
let ex = ""; // the expression string to be eval'd // // строка выражения для оценки
result.innerHTML = "0";

function clickN() {
  // when we click on a number // когда мы нажимаем на число
  if (!ex || typeof ex === "number" || ex === "0") {
    expression.innerHTML = this.id;
    ex = this.id;
  } else {
    expression.innerHTML += this.id;
    ex += this.id;
  }
  result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
  checkLength(result.innerHTML);
}

function clickO() {
  // when we click on an operation // когда мы нажимаем на операцию
  if (!ex) {
    return;
  }
  ex = ex.toString().replace(/=/, "");
  if (ex.match(/\/|\*|\+|-|=/)) {
    ex = eval(ex).toString();
  }
  expression.innerHTML = expression.innerHTML.replace(/=/, "") + this.id;
  ex += this.id;
  result.innerHTML = this.id;
}

Array.from(num).forEach(function (element) {
  // assign appropriate function to all numbers and operations // назначаем соответствующую функцию всем числам и операциям
  element.addEventListener("click", clickN);
});

Array.from(operation).forEach(function (element) {
  element.addEventListener("click", clickO);
});

// clear all on click // очистить все по клику
clear.addEventListener("click", () => {
  result.innerHTML = "";
  expression.innerHTML = "";
  ex = "";
});

// clear last entry on click // очистить последнюю запись по клику
ce.addEventListener("click", () => {
  if (!expression.innerHTML.match(/=$/)) {
    expression.innerHTML = doCE(expression.innerHTML);
    ex = doCE(ex);
    result.innerHTML = 0;

    function doCE(arg) {
      arg = arg.split(/([\/\*\+\-\=])/g);
      arg.splice(-1, 1);
      return arg.join("");
    }
  }
});

// calculate the whole thing // вычисляем все это
equals.addEventListener("click", () => {
  if (!ex) {
    result.innerHTML = "0";
  } else {
    ex = eval(ex);
    expression.innerHTML += "=";
    result.innerHTML = trim12(ex);
  }
});

function checkLength(arg) {
  // if we enter a number that's too long // если мы введем слишком длинное число
  if (arg.toString().length > 14) {
    expression.innerHTML = "number too long".toUpperCase();
    result.innerHTML = "0";
    ex = "0";
  }
}

function trim12(arg) {
  // if we calculate a number that's too long // если мы вычисляем слишком длинное число
  if (arg.toString().length > 14) {
    ex = parseFloat(arg.toPrecision(12));
    if (ex.toString().length > 14) {
      ex = ex.toExponential(9);
    }
    return ex;
  } else {
    return arg;
  }
}
