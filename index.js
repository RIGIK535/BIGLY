require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// JWT middleware
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Требуется токен' });
    jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ error: 'Неверный токен' });
        req.user = user;
        next();
    });
}

// Роуты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/order', authMiddleware, require('./routes/order'));

app.get('/', (req, res) => {
    res.send('Restaurant backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
