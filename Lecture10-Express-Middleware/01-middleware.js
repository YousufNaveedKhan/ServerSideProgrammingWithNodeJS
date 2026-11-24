// 01-middleware.js
// Middleware: functions that run BEFORE the route handler, in the order we write them.
// Setup (once): npm install
// Run: node 01-middleware.js   then open http://localhost:3000   (public/index.html is served)
// Stop the server with Ctrl + C.

const express = require("express");
const path = require("path");
const app = express();

// ---- 1. Our own middleware: a logger ----
// next() passes control to the next middleware / route. Forget it and the request hangs.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ---- 2. Built-in middleware ----
app.use(express.json()); // reads JSON body        -> req.body
app.use(express.urlencoded({ extended: true })); // reads form body (name=Ali&city=...) -> req.body
app.use(express.static(path.join(__dirname, "public"))); // serves files from the "public" folder

// ---- 3. Routes ----
app.post("/contact", (req, res) => {
  const { name, message } = req.body; // no data/end events needed any more!
  if (!name || !message) {
    return res.status(400).json({ error: "name and message are required" });
  }
  res.status(201).json({ received: { name, message } });
});

// ---- 4. Route-level middleware: runs only for this route ----
function checkApiKey(req, res, next) {
  if (req.headers["x-api-key"] !== "secret123") {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }
  next();
}

app.get("/private", checkApiKey, (req, res) => {
  res.json({ message: "Welcome, you have access" });
});

// A route that fails on purpose, to see the error handler work
app.get("/error", (req, res) => {
  throw new Error("Something broke!");
});

// ---- 5. 404 middleware: after all routes ----
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ---- 6. Error-handling middleware: has FOUR parameters (err, req, res, next) ----
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => { 
  console.log("Server running at http://localhost:3000");
});