// 01-form-server.js
// http + events + querystring together: show an HTML form and read the data the user submits.
// Run: node 01-form-server.js   then open http://localhost:3000
// Stop the server with Ctrl + C.

const http = require("http");
const querystring = require("querystring");

// Never put user text into HTML as it is - escape special characters first.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const formPage = `
<h1>Student Form</h1>
<form action="/submit" method="post">
  <p><input name="name" placeholder="Your name"></p>
  <p><input name="city" placeholder="Your city"></p>
  <button type="submit">Send</button>
</form>`;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(formPage);
  } else if (req.method === "POST" && req.url === "/submit") {
    // The body arrives in small pieces ("chunks"). The request is an event emitter:
    // 'data' fires for every chunk, 'end' fires when everything has arrived.
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log("Raw body :", body); // name=Ali+Khan&city=Karachi
      const form = querystring.parse(body); // string -> object
      console.log("As object:", form);
      console.log("Back to string:", querystring.stringify(form)); // object -> string
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h1>Thank you, ${escapeHtml(form.name)}</h1><p>City: ${escapeHtml(form.city)}</p><a href="/">Back</a>`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
