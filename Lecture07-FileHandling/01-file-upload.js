// 01-file-upload.js
// Uploading a file with http + the third-party package "formidable" (npm install).
// Run: node 01-file-upload.js   then open http://localhost:3000
// Uploaded files are saved in the "uploads" folder. Stop the server with Ctrl + C.

const http = require("http");
const fs = require("fs");
const path = require("path");
const { formidable } = require("formidable");

const uploadDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDir, { recursive: true }); // create the folder if it does not exist

// enctype="multipart/form-data" is REQUIRED for file uploads
const formPage = `
<h1>Upload an Image</h1>
<form action="/upload" method="post" enctype="multipart/form-data">
  <p><input type="text" name="title" placeholder="Title"></p>
  <p><input type="file" name="myfile"></p>
  <button type="submit">Upload</button>
</form>`;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(formPage);
  } else if (req.method === "POST" && req.url === "/upload") {
    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true, // keep .png / .jpg at the end of the saved name
      maxFileSize: 2 * 1024 * 1024, // 2 MB limit
      // Accept images only. Other files are ignored.
      filter: ({ mimetype }) => Boolean(mimetype && mimetype.startsWith("image/")),
    });

    form.parse(req, (error, fields, files) => {
      res.setHeader("Content-Type", "text/plain");

      if (error) {
        res.statusCode = error.httpCode || 400;
        res.end("Upload failed: " + error.message);
        return;
      }

      const file = files.myfile && files.myfile[0]; // formidable v3 gives an array
      if (!file) {
        res.statusCode = 400;
        res.end("No valid image received (only image files up to 2 MB are allowed)");
        return;
      }

      console.log("Saved:", file.newFilename, "| original:", file.originalFilename, "|", file.size, "bytes");
      res.statusCode = 200;
      res.end(`Upload successful!\nTitle: ${fields.title[0]}\nOriginal name: ${file.originalFilename}\nSaved as: ${file.newFilename}\nSize: ${file.size} bytes`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
