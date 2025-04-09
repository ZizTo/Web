const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET");

    console.log(`Запрос: ${request.url}`);

    let filePath;
    if (request.url === "/home") {
        filePath = path.join(__dirname, "home.html");
        response.writeHead(200, { "Content-Type": "text/html" });
    } else if (request.url === "/products") {
        filePath = path.join(__dirname, "products.html");
        response.writeHead(200, { "Content-Type": "text/html" });
    } else if (request.url === "/productsStore") {
        filePath = path.join(__dirname, "products.json");
        response.setHeader("Content-Type", "application/json; charset=utf-8");
    } else { 
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("Неизвестный маршрут");
        return;
    }

    console.log("Пытаюсь прочитать файл:", filePath);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Ошибка чтения файла:", err.message);
            response.writeHead(404);
            response.end("Файл не найден");
            return;
        }

        console.log("Файл успешно прочитан");
        console.log("data: ");
        console.log(data);  
        response.end(data);
    });
}).listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));