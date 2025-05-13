const express = require('express');
const MenuItem = require('../models/MenuItem');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Получить все блюда
router.get('/', async (req, res) => {
    console.log('GET /api/menu start');
    try {
        const menu = await MenuItem.find();
        console.log('Menu loaded:', Array.isArray(menu) ? menu.length : menu);
        res.json(menu);
        console.log('Response sent');
    } catch (err) {
        console.error('Menu load error:', err);
        res.status(500).json({ error: 'Ошибка получения меню' });
    }
});

// Middleware для проверки роли администратора
function adminOnly(req, res, next) {
    console.log('adminOnly middleware:', req.user);
    if (!req.user) {
        console.log('ОШИБКА: req.user не определён!');
        return res.status(403).json({ error: 'Нет пользователя в req.user' });
    }
    if (!req.user.isAdmin) {
        console.log('ОШИБКА: не админ!', req.user);
        return res.status(403).json({ error: 'Пользователь не админ' });
    }
    console.log('ПРОПУСКАЕМ: пользователь админ, доступ разрешён.');
    next();
}

// Добавить новое блюдо (админ)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
    try {
        const item = new MenuItem(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: 'Ошибка добавления блюда' });
    }
});

module.exports = router;
