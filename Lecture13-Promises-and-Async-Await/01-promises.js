// Syntax
new Promise((resolve, reject) => resolve("Success")).then((result) =>
  console.log(result),
);

// Promise
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    let success = true;
    if (success) {
      resolve("Task completed successfully!");
    } else {
      reject("Task failed.");
    }
  }, 2000);
});

promise
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  })
  .finally(() => console.log("Finally runs in both cases"));

// Simplified Error Handling
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve(random);
    } else {
      reject("Number too low!");
    }
  }, 500);
});

myPromise
  .then((res) => {
    console.log("Success:", res);
    return res * 2;
  })
  .then((doubled) => {
    console.log("Doubled:", doubled);
    return doubled + 5;
  })
  .then((finalres) => {
    console.log("Final:", finalres);
  })
  .catch((err) => {
    console.error("Error occurred:", err);
  });

// Chaining Promises
function first() {
  return new Promise((resolve) => resolve("First"));
}

function second(data) {
  return new Promise((resolve) => resolve(data + " Second"));
}

function third(data) {
  return new Promise((resolve) => resolve(data + " Third"));
}

first()
  .then(second)
  .then(third)
  .then((res) => console.log(res))
  .catch((err) => console.error("Error:", err));

// Parallel Execution with Promise.all()
const p1 = new Promise((resolve) => setTimeout(() => resolve("One"), 1000));
const p2 = new Promise((resolve) => setTimeout(() => resolve("Two"), 500));
const p3 = new Promise((resolve) => setTimeout(() => resolve("Three"), 200));

Promise.all([p1, p2, p3])
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

//  Chaining: the callback hell from last lecture
const getUser = (id) =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: "Laiba" }), 200),
  );
const getOrders = (user) =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ name: "Book", price: 500 }, { name: "Pen", price: 50 }]), 200),
  );
const getTotal = (orders) => new Promise((resolve) => setTimeout(() => resolve(orders.reduce((sum, o) => sum + o.price, 0)), 200));

setTimeout(() => {
    console.log("\nChain: ");
    getUser(1)
    .then((user) => getOrders(user)) 
    .then((orders) => getTotal(orders))
    .then((total) => console.log(`  total = ${total}`))
    .catch((error) => console.log(error))
}, 500);
