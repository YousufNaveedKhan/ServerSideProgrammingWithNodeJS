// 01-promises.js
// Promises: an object that represents a value that will arrive in the future.
// A promise is in one of 3 states: pending -> fulfilled (resolved) OR rejected.
// Run: node 01-promises.js

// ---- 1. Creating a promise ----
function divide(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b === 0) {
        reject(new Error("Cannot divide by zero")); // failure
        return;
      }
      resolve(a / b); // success
    }, 100);
  });
}

// ---- 2. Using it: then / catch / finally ----
divide(10, 2)
  .then((result) => console.log("1) 10 / 2 =", result))
  .catch((error) => console.log("1) Error:", error.message))
  .finally(() => console.log("1) finally: runs in both cases"));

divide(5, 0)
  .then((result) => console.log("2) 5 / 0 =", result))
  .catch((error) => console.log("2) Error:", error.message));

// ---- 3. Chaining: the callback hell from last lecture, now flat ----
const getUser = (id) => new Promise((resolve) => setTimeout(() => resolve({ id, name: "Ali" }), 200));
const getOrders = (user) => new Promise((resolve) => setTimeout(() => resolve([{ price: 500 }, { price: 50 }]), 200));
const getTotal = (orders) => new Promise((resolve) => setTimeout(() => resolve(orders.reduce((s, o) => s + o.price, 0)), 200));

setTimeout(() => {
  console.log("\n3) Chain:");
  getUser(1)
    .then((user) => getOrders(user))
    .then((orders) => getTotal(orders))
    .then((total) => console.log("   total =", total))
    .catch((error) => console.log("   Error:", error.message)); // ONE catch for the whole chain
}, 500);

// ---- 4. Promise.all: run several things at the same time ----
setTimeout(() => {
  console.log("\n4) Promise.all:");
  const start = Date.now();
  Promise.all([divide(10, 2), divide(20, 4), divide(9, 3)]).then((results) => {
    const seconds = Math.round((Date.now() - start) / 100) / 10;
    console.log("   results =", results, `(took about ${seconds} seconds, not 0.3)`);
  });
}, 1500);
