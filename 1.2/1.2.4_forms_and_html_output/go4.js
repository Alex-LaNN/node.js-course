/**
 * Reads inputs in HTTP-like format.
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
  const protocol = "HTTP/1.1";
  const date = new Date().toUTCString();
  const server = "Apache/2.2.14 (Win32)";
  const contentLenght = body.length;
  const connection = "Closed";

  console.log(`${protocol} ${statusCode} ${statusMessage}
Date: ${date}
Server: ${server}
Content-Length: ${contentLenght}
Connection: ${connection}
Content-Type: ${headers}

${body}
`);
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
  // Method and URI validation
  if (method !== "POST" || uri !== "/api/checkLoginAndPassword") {
    outputHttpResponse(400, "Bad Request", {}, "Bad Request");
    return;
  }

  // Checking the content type and outputting an HTTP response if an error is found.
  if (
    !headers["Content-Type"] ||
    headers["Content-Type"] !== "application/x-www-form-urlencoded"
  ) {
    outputHttpResponse(404, "Not Found", {}, "not found");
    return;
  }

  // Extracting login and password from the string 'body'.
  const params = new URLSearchParams(
    body
  ); /* parsing the data string passed in the HTTP request body */
  const login = params.get("login");
  const password = params.get("password");

  // Reading the 'passwords.txt' file and searching it for a matching 'login-password' pair.
  let found = false;
  try {
    const passwordsText = require("fs").readFileSync("passwords.txt", "utf-8");
    const passwordsArray = passwordsText.split("\n");
    for (const pair of passwordsArray) {
      const [storedLogin, storedPassword] = pair.replace("\r", "").split(":");
      if (storedLogin === login && storedPassword === password) {
        found = true;
        break;
      }
    }
  } catch (error) {
    outputHttpResponse(500, "Server Error", {}, "Server Error");
    return;
  }

  headers = `text/html; charset=utf-8`;
  // Formation and output of the HTTP response.
  if (found) {
    const body = '<h1 style="color:green">FOUND</h1>';
    outputHttpResponse(200, "OK", headers, body);
  } else {
    const body = '<h1 style="color:red">login or password not found!!!</h1>';
    outputHttpResponse(404, "Not Found", headers, body);
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
  //console.log(body)

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

// Parsing a string in TCP format as an HTTP request.
http = parseTcpStringAsHttpRequest(contents);
//console.log(http)
// Calling a function to process an HTTP request.
processHttpRequest(http.method, http.uri, http.headers, http.body);
