const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Se asume que el token viene en el header Authorization como "Bearer <token>"
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, acceso denegado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // <-- aquí guardamos el id del usuario
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
