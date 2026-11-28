const fs = require("fs/promises");
const path = require("path");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function divide(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => (b === 0 ? reject(new Error("Cannot divided by zero")) : resolve(a / b)), 100);
    });
}

const getUser = (id) => wait(200).then(() => ({ id, name: "Ali" }));
const getOrders = (user) => wait(200).then(() => [{ price: 500 }, { price: 50 }]);
const getTotal = (orders) => wait(200).then(() => orders.reduce((s, o) => s + o.price, 0));

async function main() {
    const result = await divide(10, 2);
    console.log("1) 10 / 2 =", result);

    try {
        await divide(5, 0);
    } catch (error) {
        console.log("2) Error:", error.message);
    }

    const user = await getUser(1);
    const orders = await getOrders(user);
    const total = await getTotal(orders);
    console.log(`3) ${user.name} has ${orders.length} orders, total = ${total}`);

    let start = Date.now();
    await divide(10, 2);
    await divide(20, 4);
    await divide(9, 3);
    console.log(`4) one after another  :`, Math.round((Date.now() - start) / 100) / 10, "seconds (about 0.3s)");

    start = Date.now();
    const all = await Promise.all([divide(10, 2), divide(20, 4), divide(9, 3)]);
    console.log("4) all at the same time:", Math.round((Date.now() - start) / 100) / 10, "seconds about 0.1s", all);

    const text = await fs.readFile(path.join(__dirname, "data.txt"), "utf-8");
    console.log("5) File says:", text.split("\n")[0]);
}

main().catch((error) => console.log("Unexpected error:", error.message));