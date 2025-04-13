const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 3000;

// Импорт роутера
const restRouter = require('./rest2');

// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json()); // Для парсинга JSON
app.use(bodyParser.urlencoded({ extended: true })); // Для данных форм
app.use(methodOverride('_method')); // Поддержка PUT/DELETE через формы
app.use(express.static(path.join(__dirname, 'public'))); // Статические файлы

// Подключение маршрутов
app.use('/', restRouter); // Все маршруты из rest.js

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});