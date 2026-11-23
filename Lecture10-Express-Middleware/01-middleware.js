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

// Route level middlewares 
// Middleware function
function checkAPIKey(req, res, next) {
    if (req.headers["x-api-key"] !== "secret123") {
        return res.status(401).json({ error: "Invalid or missing API Key" })
    }    
    next();   
}

meriApp.get("/private", checkAPIKey, (req, res) => {
    res.json({ message: "Welcome" });
})

meriApp.get("/error", (req, res) => {
    throw new Error("Error");
});

// 404 Middleware
meriApp.use((req,res) => {
    res.status(404).json({ error: "404 not found" })
});

meriApp.use((err, req, res, next) => {
    console.log("Error Message: ", err.message);
    res.status(500).json({ error: "Internal server error" });
})

// localhost:3000
meriApp.listen(3000, (req, res) => {
    console.log("Server running at http://localhost:3000");
});

