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

// Parsing a string in TCP format as an HTTP request.
http = parseTcpStringAsHttpRequest(contents);
// Calling a function to process an HTTP request.
console.log(JSON.stringify(http, undefined, 2));
