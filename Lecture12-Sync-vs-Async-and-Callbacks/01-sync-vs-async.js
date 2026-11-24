// 01-sync-vs-async.js
// Synchronous (blocking) vs asynchronous (non-blocking) code.
// Run: node 01-sync-vs-async.js

const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "data.txt");

// ---- 1. SYNCHRONOUS: Node waits here until the file is read ----
console.log("1) Sync: before reading");
const syncData = fs.readFileSync(file, "utf8");
console.log("1) Sync: file content ->", syncData.split("\n")[0]);
console.log("1) Sync: after reading");

// ---- 2. ASYNCHRONOUS: Node starts reading and moves on immediately ----
console.log("\n2) Async: before reading");
fs.readFile(file, "utf8", (error, data) => {
  // This function (the "callback") runs LATER, when the file is ready
  if (error) {
    console.log("2) Async: error ->", error.message);
    return; 
  }
  console.log("2) Async: file content ->", data.split("\n")[0]);
});
console.log("2) Async: after reading (printed BEFORE the content!)");

// ---- 3. A timer is also asynchronous ----
setTimeout(() => {
  console.log("3) Timer finished after 1 second");
}, 1000);

console.log("\nThe last line of the file - but not the last output.");
