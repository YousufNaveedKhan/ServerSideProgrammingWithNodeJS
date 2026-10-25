// 02-global-objects.js
// Global objects: available everywhere in Node.js without require().
// Run: node 02-global-objects.js

// 1. global (and globalThis) - the top-level object
console.log("global is globalThis:", global === globalThis);

// 2. process - information about the running Node.js program
console.log("Node version  :", process.version);
console.log("Platform      :", process.platform);
console.log("Current folder:", process.cwd());
console.log("Arguments     :", process.argv.length);

// 3. __filename and __dirname
console.log("__filename:", __filename);
console.log("__dirname :", __dirname);

// NOTE: they LOOK global, but they are not properties of global.
// Every file (module) gets its own copy of them.
console.log("global.__filename:", typeof global.__filename); // undefined

// 4. Module helpers - also available in every file
console.log("require / module / exports:", typeof require, typeof module, typeof exports);

// 5. Buffer - raw binary data
const buf = Buffer.from("Node");
console.log("Buffer:", buf, "->", buf.toString());

// 6. Timers - setTimeout / setInterval
setTimeout(() => {
  console.log("3) setTimeout ran after 1 second");
}, 1000);

let count = 0;
const timer = setInterval(() => {
  count++;
  console.log("2) setInterval tick", count);
  if (count === 2) clearInterval(timer);
}, 400);
  
console.log("1) This line prints before the timers - Node does not wait");
