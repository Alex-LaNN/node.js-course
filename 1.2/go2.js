// этот файл надо будет дописать...

// не обращайте на эту функцию внимания
// она нужна для того чтобы правильно читать входные данные
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

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {
  // Разбить текст на строки.
  const lines = splitLines(string);
  // Деструктуризация массива => присвоение извлеченных данных соответствующим переменным.
  const [method, uri, version] = lines[0].split(" ");
  // Индекс следующей строки для обработки.
  let index = 1;
  // Ассоциативный массив пар строк.
  const headerLines = [];
  // Проход по всем оставшимся строкам.
  while (index < lines.length && lines[index] !== "") {
    // Добавление текущей строки в массив 'headerLines'.
    headerLines.push(lines[index]);
    index++;
  }
  // Пропускаем пустую строку между заголовками и телом, если она есть.
  if ((line) => !line) index++;
  // Вызов функции 'parseHeaders()' для анализа массива 'headerLines'.
  const headers = parseHeaders(headerLines);
  // Извлечение значения для 'body' из оставшихся строк, начиная с индекса index, и их объединения с использованием символа новой строки.
  const body = lines.slice(index).join("\n");

  return {
    method,
    uri,
    headers,
    body,
  };
}

// Парсит строки и возвращает объект с парами ключ-значение.
function parseHeaders(headerLines) {
  const headers = {};

  for (const line of headerLines) {
    const [key, value] = line.split(": ");
    headers[key] = value;
  }

  return headers;
}

// Эта функция разбивает текст на строки и возвращает массив строк.
function splitLines(text) {
  return text.split(/\r?\n/);
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));
