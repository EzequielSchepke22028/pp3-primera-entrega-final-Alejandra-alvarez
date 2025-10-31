const jwt = require('jsonwebtoken');
const User = require('../Models/Users');

const auth = async (req, res, next) => {
  try {
    // Acepta tanto "Authorization" como "authorization" y soporta "Bearer <token>"
    const authHeader = req.header('Authorization') || req.header('authorization');
    const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null;

    if (!token) {
      console.log('🔒 auth: no token en headers');
      return res.status(401).json({ error: 'Acceso denegado. No hay token proporcionado.' });
    }

    // Verificar token (lanza si expiró o es inválido)
    let decoded;
    try {
      // 🔧 CORRECCIÓN: Usar process.env.JWT_SECRET directamente
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch (err) {
      console.log('🔒 auth: token inválido/expirado', err.message);
      return res.status(401).json({ error: 'Token no válido o expirado.' });
    }

    // Buscar usuario (solo campos necesarios)
    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) {
      console.log('🔒 auth: token válido pero usuario no encontrado', decoded.id);
      return res.status(401).json({ error: 'Token no válido. Usuario no encontrado.' });
    }

    // Adjuntar sólo lo necesario a req.user para evitar payloads pesados
    req.user = {
      id: user._id.toString(),
      username: user.username
    };

    console.log('✅ auth: usuario verificado', req.user.username);

    next();
  } catch (error) {
    console.error('🔒 auth error:', error);
    res.status(401).json({ error: 'Token no válido.' });
  }
};

module.exports = auth;