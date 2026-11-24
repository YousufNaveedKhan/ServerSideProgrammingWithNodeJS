// 02-callbacks.js
// Callbacks: a function that we pass to another function, to be called later.
// Run: node 02-callbacks.js

// ---- 1. A callback is just a function passed as an argument ----
function greet(name, callback) { 
  console.log(`Hello, ${name}!`);
  callback();
}
greet("Ali", () => console.log("1) greet() is done, now the callback runs"));

// ---- 2. Error-first callback: callback(error, result) - the Node.js convention ----
function divide(a, b, callback) {
  setTimeout(() => {
    if (b === 0) {
      callback(new Error("Cannot divide by zero"));
      return; 
    }
    callback(null, a / b); // no error -> first argument is null
  }, 100);
}
divide(10, 2, (error, result) => {
  if (error) return console.log("2) Error:", error.message);
  console.log("2) 10 / 2 =", result);
});

divide(5, 0, (error, result) => {
  if (error) return console.log("2) Error:", error.message);
  console.log("2) 5 / 0 =", result);
});

// ---- 3. Callback hell: each step needs the result of the previous one ----
function getUser(id, callback) {
  setTimeout(() => callback(null, { id, name: "Ali" }), 200);
}
function getOrders(user, callback) {
  setTimeout(() => callback(null, [{ item: "Book", price: 500 }, { item: "Pen", price: 50 }]), 200);
}
function getTotal(orders, callback) {
  setTimeout(() => callback(null, orders.reduce((sum, o) => sum + o.price, 0)), 200);
}

setTimeout(() => {
  console.log("\n3) Callback hell:");
  getUser(1, (error, user) => {
    if (error) return console.log(error);
    getOrders(user, (error, orders) => {
      if (error) return console.log(error);
      getTotal(orders, (error, total) => {
        if (error) return console.log(error);
        console.log(`   ${user.name} has ${orders.length} orders, total = ${total}`);
        // Three levels already... imagine ten. The code keeps moving to the right.
        // Promises and async/await (next lecture) solve this problem.
      });
    });
  });
}, 500);
