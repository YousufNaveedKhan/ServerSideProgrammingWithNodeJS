// 01-http-url-server.js
// http module: a web server with routing.  url: read the path and the query (?name=Ali).
// Run: node 01-http-url-server.js
// Then open: http://localhost:3000/   /about   /greet?name=Ali   /api/students   /anything-else
// Stop the server with Ctrl + C.

const http = require("http");

const students = [
  { id: 1, name: "Ali", city: "Karachi" },
  { id: 2, name: "Sara", city: "Lahore" },
];

const server = http.createServer((req, res) => {
  // req.url only has the path + query, so we give "http://localhost:3000" as the base
  const url = new URL(req.url, "http://localhost:3000");
  console.log(req.method, url.pathname, url.search);

  if (url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home Page</h1><p>Welcome to our Node.js server</p>");
  } else if (url.pathname === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the About page");
  } else if (url.pathname === "/greet") {
    const name = url.searchParams.get("name") || "Guest"; // /greet?name=Ali
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello, ${name}!`);
  } else if (url.pathname === "/api/students") {
    // JSON response: this is how APIs send data
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
