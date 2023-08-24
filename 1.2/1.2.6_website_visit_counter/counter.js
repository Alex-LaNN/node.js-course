const http = require("http");
const fs = require("fs");
const path = require("path");

// Создание сервера
const server = http.createServer((req, res) => {
    if (req.url === `http://${HOST}:${PORT}`) {
  res.writeHead(200, { "Content-Type": "image/x-icon" });
     return res.end();
   }

  // Получение пути к файлу счетчика
  const filePath = path.join(__dirname, "counter.txt");

  // Чтение текущего значения счетчика из файла
  let counter = 0;
  try {
    counter = parseInt(fs.readFileSync(filePath, "utf-8")) || 0;
  } catch (error) {
    // Если файл не существует, счетчик останется равным 0
  }

  // Увеличение счетчика
  counter++;  // не соблюдается условие увеличения счетчика на '1' (увеличивает на '2')!!!!

  // Запись нового значения счетчика в файл
  fs.writeFileSync(filePath, counter.toString(), "utf-8");

  // Отправка ответа с текущим значением счетчика
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<h1>${counter}</h1>`);
});

// Запуск сервера на порте 8000
const PORT = 8000;
const HOST = "localhost";

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен: http://${HOST}:${PORT}`);
});
