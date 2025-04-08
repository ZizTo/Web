const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname)));

// Маршрут 1: Отдача index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Маршрут 2: Скачивание файла products.json
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'products.json');
    res.download(filePath, 'auto-parts-products.json');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});