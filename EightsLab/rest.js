const express = require('express');
const router = express.Router();
const store = require('./store');
const bodyparser = require("body-parser");

const jsonParser = bodyparser.json()

// http://localhost:3000/api/items
router.get('/items', (req, res) => {
    const data = store.getAll();
    res.json(data);
});

// curl -X POST -H "Content-Type: application/json" -d '{"name": "Руль","price": 270,"description": "Класный руль, не пошарпаный"}' http://localhost:3000/api/items
router.post('/items', jsonParser, (req, res) => {
    const newItem = req.body;
    store.create(newItem);
    res.status(201).json({ message: 'Запись создана' });
});

// curl -X PUT -H "Content-Type: application/json" -d '{"price":1480}' http://localhost:3000/api/items/123456
router.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    const success = store.update(id, updatedItem);
    if (success) res.json({ message: 'Запись обновлена' });
    else res.status(404).json({ error: 'Запись не найдена' });
});

// curl -X DELETE http://localhost:3000/api/items/123456
router.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const success = store.remove(id);
    if (success) res.json({ message: 'Запись удалена' });
    else res.status(404).json({ error: 'Запись не найдена' });
});

module.exports = router;