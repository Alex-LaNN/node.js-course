const fs = require("fs");
const path = require("path");

/**
 * Reads inputs in HTTP-like format.
 *
 * @returns {string} - Read HTTP-like data.
 */
function readHttpLikeInput() {
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (;;) {
    try {
      fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
    } catch (e) {
      break; /* windows */
    }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10) break;
      was10++;
    } else was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

/**
 * Outputs an HTTP response with the given parameters.
 *
 * @param {number} statusCode - HTTP status code.
 * @param {string} statusMessage - HTTP status message.
 * @param {Object} headers - HTTP headers.
 * @param {string} body - Response body.
 */
function outputHttpResponse(statusCode, statusMessage, headers, body) {
  const protocol = "HTTP/1.1";
  const date = getDate();
  const server = "Apache/2.2.14 (Win32)";
  const contentLenght = body.length;
  const connection = "Closed";
  const contentType = "text/html; charset=utf-8";

  console.log(`${protocol} ${statusCode} ${statusMessage}
Date: ${date}
Server: ${server}
Content-Length: ${contentLenght}
Connection: ${connection}
Content-Type: ${contentType}

${body}
`);
}

/**
 * Processes an HTTP request by creating and sending an HTTP response.
 *
 * @param {string} method - HTTP method of the request.
 * @param {string} uri - Resource URI.
 * @param {Object} headers -An object with HTTP headers for the request.
 * @param {string} body - Request body.
 */
function processHttpRequest(method, uri, headers, body) {
  // Assignment of the base folder for working with the file, depending on the value of the 'Host' header.
  let basePath = "";
  if (headers.Host.startsWith("student.shpp.me")) {
    basePath = "student";
  } else if (headers.Host.startsWith("another.shpp.me")) {
    basePath = "another";
  } else {
    basePath = "else";
  }

  // Assigning a given value to 'uri', under a certain condition.
  if (uri === "/") {
    uri = "/index.html";
  }

  // Formation of the path to the file.
  const filePath = path.join(__dirname, basePath, uri);

  try {
    // Reading a file.
    const fileContent = fs.readFileSync(filePath, "utf-8");
    // Formation of an HTTP response:
    outputHttpResponse(200, "OK", headers, fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      // If the file is not found.
      outputHttpResponse(404, "Not Found", headers, "not found");
    } else if (error.code === "EACCES") {
      // If access error.
      outputHttpResponse(403, "Forbidden", headers, "forbidden");
    } else {
      // Other errors.
      outputHttpResponse(
        500,
        "Some server error",
        headers,
        "some server error"
      );
    }
  }
}

/**
 * Parses a TCP string as an HTTP request, extracting the method, URI, headers, and body of the request.
 *
 * @param {string} string  -The input string is in TCP format.
 * @returns {Object} - An object that contains the extracted HTTP request data.
 */
function parseTcpStringAsHttpRequest(string) {
  // Split the string into lines representing the lines of the TCP packet.
  const lines = splitLines(string);
  // Destructuring the array => assigning the retrieved data to the appropriate variables.
  const [method, uri, version] = lines[0].split(" ");
  // The index of the next row to process.
  let index = 1;
  const headerLines = [];
  // Pass through all the remaining lines.
  while (index < lines.length && lines[index] !== "") {
    // Adding the current line to the 'headerLines' array.
    headerLines.push(lines[index]);
    index++;
  }
  // Skip the empty line between the headers and the body, if there is one.
  if ((line) => !line) index++;
  // Processing the 'headerLines' array.
  const headers = parseHeaders(headerLines);
  // Extract value for 'body'.
  const body = lines.slice(index).join("");

  return {
    method,
    uri,
    headers,
    body,
  };
}

/**
 * Parses strings and returns an object with key-value pairs.
 *
 * @param {Array} headerLines - An array of strings representing the HTTP headers.
 * @returns {Object} - An object containing the HTTP headers.
 */
function parseHeaders(headerLines) {
  const headers = {};
  // Iterate over each row of headers.
  for (const line of headerLines) {
    // Split the string at the ": " character to get the header key and value.
    const [key, value] = line.split(": ");
    // Adding a key-value pair to the headers object.
    headers[key] = value;
  }

  return headers;
}

/**
 * Splits the input text into an array of strings, using newline characters as delimiters.
 *
 * @param {string} text - The input text to split into lines.
 * @returns {Array} - An array of strings obtained from the input text.
 */
function splitLines(text) {
  // Use the regular expression /\r?\n/ to separate the text into lines.
  return text.split(/\r?\n/);
}

/**
 * Gets the current date and time with a 3 hour offset.
 *
 * @returns {string} - Current date and time in UTC format.
 */
function getDate() {
  // Getting the current date and time.
  const currentDate = new Date();

  // Local time setting (3 hours ahead).
  currentDate.setHours(currentDate.getHours() + 3);

  // Convert date to UTC string.
  const date = currentDate.toUTCString();

  return date;
}

// Parsing a string in TCP format as an HTTP request.
http = parseTcpStringAsHttpRequest(contents);
// Calling a function to process an HTTP request.
processHttpRequest(http.method, http.uri, http.headers, http.body);
