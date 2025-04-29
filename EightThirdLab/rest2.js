const express = require('express');
const router = express.Router();
const store = require('./store');

// Рендеринг главной страницы (EJS)
router.get('/', (req, res) => {
    const options = {
        page: req.query.page,
        limit: 2,//req.query.limit || 5,
        search: req.query.search,
        sort: req.query.sort || 'name',
        sortDir: req.query.sortDir || 'asc'
    };
    
    const result = store.getAll(options);
    res.render('indexnew', {
        title: 'AutoParts Store',
        items: result.items,
        pagination: result.pagination,
        query: {
            search: options.search || '',
            sort: options.sort,
            sortDir: options.sortDir
        }
    });
});

// CRUD API
// Получить все записи (GET)
router.get('/items', (req, res) => {
    const options = {
        page: req.query.page,
        limit: req.query.limit,
        search: req.query.search,
        sort: req.query.sort,
        sortDir: req.query.sortDir
    };
    
    const result = store.getAll(options);
    res.json(result);
});

// Создать запись (POST)
router.post('/items', (req, res) => {
    try {
        const newItem = req.body;
        store.create(newItem);
        // Сохраняем текущие параметры поиска и сортировки
        const redirectUrl = '/?page=1' + 
            (req.query.search ? `&search=${req.query.search}` : '') +
            (req.query.sort ? `&sort=${req.query.sort}` : '') +
            (req.query.sortDir ? `&sortDir=${req.query.sortDir}` : '');
        res.status(201).redirect(redirectUrl);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании записи' });
    }
});

// Обновить запись (PUT)
router.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    const success = store.update(id, updatedItem);
    
    // Сохраняем текущие параметры для редиректа
    const redirectUrl = '/' + 
        (req.query.page ? `?page=${req.query.page}` : '?page=1') + 
        (req.query.search ? `&search=${req.query.search}` : '') +
        (req.query.sort ? `&sort=${req.query.sort}` : '') +
        (req.query.sortDir ? `&sortDir=${req.query.sortDir}` : '');
    
    if (success) res.redirect(redirectUrl); 
    else res.status(404).json({ error: 'Запись не найдена' });
});

// Удалить запись (DELETE)
router.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const success = store.remove(id);
    
    // Сохраняем текущие параметры для редиректа
    const redirectUrl = '/' + 
        (req.query.page ? `?page=${req.query.page}` : '?page=1') + 
        (req.query.search ? `&search=${req.query.search}` : '') +
        (req.query.sort ? `&sort=${req.query.sort}` : '') +
        (req.query.sortDir ? `&sortDir=${req.query.sortDir}` : '');
        
    if (success) res.redirect(redirectUrl); 
    else res.status(404).json({ error: 'Запись не найдена' });
});

module.exports = router;