// 01-modules-demo.js
// Built-in modules (os, path) and a third-party package (lodash).
// Setup (once): npm install        (installs lodash from package.json)
// Run: node 01-modules-demo.js

const os = require("os"); // built-in: no install needed
const path = require("path"); // built-in: no install needed
const _ = require("lodash"); // third-party: needed "npm install lodash"

// ---- Built-in: os (information about the computer) ----
console.log("Platform :", os.platform());
console.log("CPU cores:", os.cpus().length);

// ---- Built-in: path (work with file paths on any OS) ----
console.log("\nFile name:", path.basename(__filename));
console.log("Extension:", path.extname(__filename));

// ---- Third-party: lodash (utility functions) ----
console.log("\ncapitalize:", _.capitalize("node.js is FUN"));
console.log("chunk     :", _.chunk([1, 2, 3, 4, 5], 2));
console.log("sum       :", _.sum([10, 20, 30]));

// ---- What happens if a package is not installed? ----
try {
  require("package-that-is-not-installed");
} catch (error) {
  console.log("\nError code:", error.code);
}
