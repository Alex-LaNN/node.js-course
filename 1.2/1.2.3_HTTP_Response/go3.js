/**
 * Reads input in HTTP-like format from stdin.
 *
 * @returns {string} - Read HTTP-like data.
 */
function readHttpLikeInput() {
  var fs = require("fs");
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
  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}`);
  console.log(`Date: ${new Date().toUTCString()}`);
  console.log(`Server: Apache/2.2.14 (Win32)`);
  console.log(`Connection: Closed`);
  console.log(`Content-Type: text/html; charset=utf-8`);
  console.log(`Content-Length: ${Buffer.byteLength(body, "utf-8")}`);
  console.log("");
  console.log(body);
}

/**
 * Handles an HTTP request, taking actions according to the method and URI.
 *
 * @param {string} method - HTTP request method.
 * @param {string} uri - The HTTP request URI.
 * @param {Object} headers - HTTP request headers.
 * @param {string} body - The body of the HTTP request.
 */
function processHttpRequest(method, uri, headers, body) {
  // Checking the request method.
  if (method === "GET") {
    // Processing request of type "/sum".
    if (uri.startsWith("/sum")) {
      const queryParams = uri.split("?")[1];
      // Checking for the presence of the "nums" parameter.
      if (queryParams && queryParams.includes("nums=")) {
        const numsStr = queryParams.split("nums=")[1];
        const nums = numsStr.split(",").map(Number);
        const sum = nums.reduce((acc, num) => acc + num, 0);
        outputHttpResponse(200, "OK", headers, sum.toString());
      } else {
        outputHttpResponse(400, "Bad Request", headers, "Bad Request");
      }
    } else {
      // Answer for the case when the URL does not start with "/sum".
      outputHttpResponse(404, "Not Found", headers, "not found");
    }
  } else {
    // Answer for the case if the request method is not "GET".
    outputHttpResponse(404, "Not Found", headers, "not found");
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
    const [key, value] = line.split(":");
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

// Parsing a string in TCP format as an HTTP request.
http = parseTcpStringAsHttpRequest(contents);
// Calling a function to process an HTTP request.
processHttpRequest(http.method, http.uri, http.headers, http.body);
