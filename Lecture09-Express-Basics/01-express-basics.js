// 01-express-basics.js
// The same ideas as Lecture 02 (routing, query, JSON) but with Express.
// Setup (once): npm install
// Run: node 01-express-basics.js
// Then open: http://localhost:3000/   /about   /greet/Ali   /search?q=node   /api/students   /api/students/2

const express = require("express");
const app = express();

const students = [
  { id: 1, name: "Ali", city: "Karachi" },
  { id: 2, name: "Sara", city: "Lahore" },
];

// res.send(): Express sets the Content-Type for us (text/html for a string)
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><p>Welcome to our Express server</p>");
});

app.get("/about", (req, res) => {
  res.type("text/plain").send("This is the About page");
});

// Route parameter: /greet/Ali  ->  req.params.name = "Ali"
app.get("/greet/:name", (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

// Query parameter: /search?q=node  ->  req.query.q = "node"
app.get("/search", (req, res) => {
  const q = req.query.q || "nothing";
  res.send(`You searched for: ${q}`);
});

// res.json(): converts to JSON and sets Content-Type: application/json
app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(student);
});

// Runs only when no route above matched -> our 404
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
