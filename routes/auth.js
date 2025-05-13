const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Пользователь уже существует' });
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hash });
        await user.save();
        res.status(201).json({ message: 'Пользователь зарегистрирован' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка регистрации' });
    }
});

// Логин
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Неверные данные' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Неверные данные' });
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка входа' });
    }
});

module.exports = router;
