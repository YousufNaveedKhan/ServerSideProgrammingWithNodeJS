// math.js
// Our own (local) module. Only what we put in module.exports is visible outside this file.

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
} 

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

const secret = "only inside math.js"; // not exported, so nobody outside can use it

module.exports = { add, multiply, divide };
