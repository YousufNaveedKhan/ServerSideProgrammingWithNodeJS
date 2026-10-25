// 03-constructs.js
// Major programming constructs in JavaScript (running on Node.js).
// Run: node 03-constructs.js

// ---- 1. Variables ----
const course = "Node.js"; // const: cannot be reassigned
let students = 20; // let: can be reassigned
students = students + 5;
console.log("Variables:", course, students);

// ---- 2. Data types ----
console.log("Types:", typeof "text", typeof 10, typeof true, typeof undefined, typeof null, typeof {}, typeof []);

// ---- 3. Operators ----
console.log("Operators:", 10 + 5, 10 - 5, 10 * 5, 10 / 4, 10 % 3, 2 ** 3);
console.log("Compare  :", 5 === 5, 5 === "5", 5 > 3, true && false, true || false);

// ---- 4. Conditions: if / else if / else ----
const marks = 72;
if (marks >= 80) {
  console.log("Grade A");
} else if (marks >= 60) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}

// ---- 5. switch ----
const day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Some other day");
}

// ---- 6. Loops ----
for (let i = 1; i <= 3; i++) {
  console.log("for loop:", i);
}

let n = 3;
while (n > 0) {
  console.log("while loop:", n);
  n--;
}

// ---- 7. Arrays ----
const fruits = ["apple", "banana", "mango"];
fruits.push("orange");
console.log("Array:", fruits, "length =", fruits.length);
for (const fruit of fruits) {
  console.log(" -", fruit);
}

// ---- 8. Objects ----
const student = { name: "Ali", age: 21, city: "Karachi" };
console.log("Object:", student.name, student["city"]);
student.age = 22;
console.log(student);

// ---- 9. Functions ----
function add(a, b) {
  return a + b;
}
const multiply = (a, b) => a * b; // arrow function
console.log("Functions:", add(2, 3), multiply(2, 3));

// ---- 10. Template literal ----
console.log(`${student.name} is learning ${course}`);
