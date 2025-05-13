const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Middleware для проверки роли администратора
function adminOnly(req, res, next) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'Требуются права администратора' });
    }
    next();
}

// Получить все заказы (админ)
router.get('/', adminOnly, async (req, res) => {
    try {
        const orders = await Order.find().populate('customer').populate('items.menuItem');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка получения заказов' });
    }
});

// Создать заказ
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: 'Ошибка создания заказа' });
    }
});

module.exports = router;
