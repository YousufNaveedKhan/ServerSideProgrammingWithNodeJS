// 01-hello.js
// Our first Node.js program.
// Run: node 01-hello.js

console.log("Hello, Node.js");

// Both "global" and "process" are built into Node.js (no import needed)
console.log(typeof global, typeof process);

// Full path of this file and of the folder it lives in
console.log(__filename);
console.log(__dirname);
