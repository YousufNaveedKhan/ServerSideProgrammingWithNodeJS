const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

emitter.on("greet", (name) => {
    console.log(`(second listener), Welcome, ${name}!`);
});


emitter.emit("greet", "Abu Hurerah");

emitter.once("start", () => console.log("starting..."));

emitter.emit("start");
emitter.emit("start");


class Shop extends EventEmitter {
    placeOrder(item) {
        console.log(`Order placed for ${item}`);
        this.emit("order", item);
    }
}

const shop = new Shop();
shop.on("order", (item) => console.log(`Kitchen: preparing your ${item}`));
shop.on("order", (item) => console.log(`Billing: invoice for your ${item}`));
shop.placeOrder("Burger");