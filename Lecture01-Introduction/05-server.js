// 05-server.js
// Preview: our first web server using the built-in "http" module.
// Run: node 05-server.js   then open http://localhost:3000 in the browser
// Stop the server with Ctrl + C.

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from Node server");
}); 

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
