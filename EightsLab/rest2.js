const express = require('express');
const router = express.Router();
const store = require('./store');

// Рендеринг главной страницы (EJS)
router.get('/', (req, res) => {
    const items = store.getAll();
    res.render('indexnew', {
        title: 'AutoParts Store', // Замените на свою предметную область
        items: items
    });
});

// CRUD API
// Получить все записи (GET)
router.get('/items', (req, res) => {
    const data = store.getAll();
    res.json(data);
});

// Создать запись (POST)
router.post('/items', (req, res) => {
    try {
        const newItem = req.body;
        store.create(newItem);
        res.status(201).redirect('/'); // Перенаправление после создания
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании записи' });
    }
});

// Обновить запись (PUT)
router.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    const success = store.update(id, updatedItem);
    if (success) res.redirect('/'); // Перенаправление после обновления
    else res.status(404).json({ error: 'Запись не найдена' });
});

// Удалить запись (DELETE)
router.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const success = store.remove(id);
    if (success) res.redirect('/'); // Перенаправление после удаления
    else res.status(404).json({ error: 'Запись не найдена' });
});

module.exports = router;