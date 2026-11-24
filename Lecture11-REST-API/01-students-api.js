// 01-students-api.js
// A RESTful API for "students" (data is kept in memory, so it resets when the server restarts).
// Setup (once): npm install
// Run: node 01-students-api.js
// Test with Postman or curl (commands are in the README).

const express = require("express");
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: "Ali", city: "Karachi" },
  { id: 2, name: "Sara", city: "Lahore" },
];
let nextId = 3;

// READ all   (optional filter: /students?city=Karachi)
app.get("/students", (req, res) => {
  const { city } = req.query;
  res.json(city ? students.filter((s) => s.city === city) : students);
});

// READ one
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// CREATE   -> 201 Created
app.post("/students", (req, res) => {
  const { name, city } = req.body;
  if (!name || !city) {
    return res.status(400).json({ error: "name and city are required" });
  }
  const student = { id: nextId++, name, city };
  students.push(student);
  res.status(201).json(student);
});

// UPDATE (replace the whole student)
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, city } = req.body;
  if (!name || !city) {
    return res.status(400).json({ error: "name and city are required" });
  }
  student.name = name;
  student.city = city;
  res.json(student);
});

// DELETE   -> 204 No Content (success, nothing to send back)
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Student not found" });
  students.splice(index, 1);
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler (4 parameters). It also catches broken JSON sent by the client.
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});