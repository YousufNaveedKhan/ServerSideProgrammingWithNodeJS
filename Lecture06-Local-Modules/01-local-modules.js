// 01-local-modules.js
// Using our own module (math.js).
// Run: node 01-local-modules.js
// Rule: for our own files the path must start with ./ or ../  (without ./ Node looks for a built-in or npm package)

const math = require("./math"); // ".js" is optional

console.log("2 + 3 =", math.add(2, 3));
console.log("4 x 5 =", math.multiply(4, 5));
console.log("10 / 4 =", math.divide(10, 4));

try {
  math.divide(5, 0);
} catch (error) {
  console.log("Error caught:", error.message);
}

// Anything that is not exported stays private
console.log("Private value visible outside?", math.secret); // undefined

// Node loads a module only once and keeps it in cache - same object every time
console.log("Same module object?", require("./math") === math); // true
