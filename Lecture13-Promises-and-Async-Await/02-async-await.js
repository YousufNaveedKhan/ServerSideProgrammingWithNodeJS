// 02-async-await.js
// async / await: write promise code that LOOKS like normal step-by-step code.
// Run: node 02-async-await.js

const fs = require("fs/promises"); // the promise version of the fs module
const path = require("path");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function divide(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (b === 0 ? reject(new Error("Cannot divide by zero")) : resolve(a / b)), 100);
  });
}

const getUser = (id) => wait(200).then(() => ({ id, name: "Ali" }));
const getOrders = (user) => wait(200).then(() => [{ price: 500 }, { price: 50 }]);
const getTotal = (orders) => wait(200).then(() => orders.reduce((s, o) => s + o.price, 0));

// "async" before a function = it always returns a promise.
// "await" = wait here for the promise (only allowed inside an async function).
async function main() {
  // 1. await instead of .then()
  const result = await divide(10, 2);
  console.log("1) 10 / 2 =", result);

  // 2. try / catch instead of .catch()
  try {
    await divide(5, 0);
  } catch (error) {
    console.log("2) Error:", error.message);
  }

  // 3. The callback-hell example, now step by step
  const user = await getUser(1);
  const orders = await getOrders(user);
  const total = await getTotal(orders);
  console.log(`3) ${user.name} has ${orders.length} orders, total = ${total}`);

  // 4. Sequential vs parallel
  let start = Date.now();
  await divide(10, 2);
  await divide(20, 4);
  await divide(9, 3);
  console.log("4) one after another  :", Math.round((Date.now() - start) / 100) / 10, "seconds (about 0.3)");

  start = Date.now();
  const all = await Promise.all([divide(10, 2), divide(20, 4), divide(9, 3)]);
  console.log("4) all at the same time:", Math.round((Date.now() - start) / 100) / 10, "seconds (about 0.1)", all);

  // 5. A real example: reading a file with promises
  const text = await fs.readFile(path.join(__dirname, "data.txt"), "utf8");
  console.log("5) File says:", text.split("\n")[0]);
}

main().catch((error) => console.log("Unexpected error:", error.message));
