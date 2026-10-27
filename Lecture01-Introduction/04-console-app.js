// 04-console-app.js
// A small console-based app: takes input from the keyboard and prints a result.
// Run: node 04-console-app.js
// Optional: pass the name as an argument -> node 04-console-app.js Ali

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// process.argv[0] = node path, [1] = this file, [2] = first user argument
const nameFromArgs = process.argv[2];

function getGrade(marks) {
  if (marks >= 80) return "A";
  if (marks >= 60) return "B";
  if (marks >= 40) return "C";
  return "F";
}

function showResult(name, marks) {
  console.log("-----------------------");
  console.log(`Name  : ${name}`);
  console.log(`Marks : ${marks}`);
  console.log(`Grade : ${getGrade(marks)}`);
  console.log("-----------------------");
}

function askMarks(name) {
  rl.question("Enter your marks (0-100): ", (answer) => {
    const marks = Number(answer);
    if (Number.isNaN(marks) || marks < 0 || marks > 100) {
      console.log("Invalid marks, please try again.");
      askMarks(name);
      return;
    }
    showResult(name, marks);
    rl.close();
  });
}
  
if (nameFromArgs) {
  askMarks(nameFromArgs);
} else {
  rl.question("Enter your name: ", (name) => askMarks(name));
}
