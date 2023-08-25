const http = require("http");
const fs = require("fs");
const path = require("path");

// Server creation.
const server = http.createServer((req, res) => {
  //
  if (req.url == "/favicon.ico") {
    return;
  }

  // Getting the path to the counter file.
  const filePath = path.join(__dirname, "file_for_counter.txt");

  // Reading the current counter value from a file.
  let counter = 0;
  try {
    counter = parseInt(fs.readFileSync(filePath, "utf-8")) || 0;
  } catch (error) {
    // If the file does not exist, the counter will remain at 0.
  }

  // Counter increase.
  counter++;

  // Writing a new counter value to a file.
  fs.writeFileSync(filePath, counter.toString(), "utf-8");

  // Sending a response with the current value of the counter.
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<h1>${counter}</h1>`);
});

// Constants to specify the port and host on which the server will run.
const PORT = 8000;
const HOST = "localhost";

// Start listening on the server on the specified port and host.
server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен: http://${HOST}:${PORT}`);
});
