const express = require("express");
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: "Laiba", course: "HDSE", city: "Karachi" },
  { id: 2, name: "Anusha", course: "ADSE", city: "Lahore" },
];
let nextId = 3;

// READ ALL
app.get("/students", (req, res) => {
  const { city } = req.query;
  res.json(city ? students.filter((s) => s.city === city) : students);
});

// READ ONE
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(student);
});

// CREATE
app.post("/students", (req, res) => {
    const { name, city } = req.body;
    if (!name || !city) return res.status(404).json({ error: "name or city are required" });

    const student = { id: nextId++, name, city }
    students.push(student);
    res.status(201).json(student);
});

// UPDATE
app.put("/students/:id", (req, res) => {
    const student = students.find((s) => s.id === Number(req.params.id));
    if (!student) return res.status(404).json({ error: "Student not found" });

    const { name, city } = req.body;
    if (!name || !city) return res.status(404).json({ error: "name or city are required" });

    student.name = name; 
    student.city = city;
    res.json(student);
})

// DELETE
app.delete("/students/:id", (req, res) => {
    const index = students.findIndex((s) => s.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Student not found" });

    students.splice(index, 1);
    res.status(204).end();
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: "Invalid JSON" });
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});


app.listen(3000, (req, res) => {
  console.log("Server running at http://localhost:3000");
});
