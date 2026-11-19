const express = require("express");
const path = require("path");
const meriApp = express();

// Our own middleware:  a Logger
meriApp.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Built in middlewares
// res.writeHead(200, { "Content-Type": "application/json" })
meriApp.use(express.json()); // read json data
meriApp.use(express.urlencoded()) // req.body => parse
meriApp.use(express.static(path.join(__dirname, "public"))) // => "/" 

// Routes ( Route Handler )
meriApp.post("/contact", (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: "name and message are required!" })
    }
    res.status(201).json({ received: { name, message } })
});

// localhost:3000
meriApp.listen(3000, (req, res) => {
    console.log("Server running at http://localhost:3000");
});