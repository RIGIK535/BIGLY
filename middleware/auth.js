const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  console.log('AUTH HEADER:', req.headers['authorization']);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Требуется токен' });
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Неверный токен' });
    req.user = user;
    next();
  });
};
