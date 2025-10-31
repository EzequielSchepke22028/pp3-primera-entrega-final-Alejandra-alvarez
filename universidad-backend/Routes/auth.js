const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/Users');
const router = express.Router();

// 🔐 RUTA DE LOGIN
router.post('/login', async (req, res) => {
  try {
    console.log('🔍 LOGIN REQUEST BODY:', req.body);
    
    const { username, password } = req.body; // ← Mantener username

    console.log('📨 Login attempt for:', username);

    // 1. Buscar usuario por USERNAME (no email)
    const user = await User.findOne({ username });
    console.log('🔍 USER FOUND:', user);
    
    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ 
        success: false,
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // 2. Verificar si está bloqueado
    if (user.isBlocked) {
      console.log('❌ User blocked');
      return res.status(401).json({ 
        success: false,
        message: 'Usuario bloqueado. Contacta al administrador.' 
      });
    }

    // 3. Verificar contraseña - FIX: usar passwordHash del modelo viejo
    console.log('🔍 COMPARING PASSWORD...');
    const isMatch = await user.comparePassword(password);
    console.log('🔍 PASSWORD MATCH:', isMatch);
    
    if (!isMatch) {
      // Incrementar intentos fallidos
      user.failedAttempts += 1;
      
      // Bloquear después de 3 intentos fallidos
      if (user.failedAttempts >= 3) {
        user.isBlocked = true;
        await user.save();
        return res.status(401).json({ 
          success: false,
          message: 'Usuario bloqueado por demasiados intentos fallidos' 
        });
      }
      
      await user.save();
      console.log('❌ Password incorrect. Attempts:', user.failedAttempts);
      return res.status(401).json({ 
        success: false,
        message: `Usuario o contraseña incorrectos. Intentos restantes: ${3 - user.failedAttempts}` 
      });
    }

    // 4. Resetear intentos fallidos en login exitoso
    user.failedAttempts = 0;
    await user.save();

    // 5. Generar token JWT
    console.log('🔍 GENERATING TOKEN...');
    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', user.username);

    // 6. Enviar respuesta
    res.json({
      success: true,
      message: 'Login exitoso',
      token: token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('💥 LOGIN ERROR DETAILS:', error);
    console.error('💥 ERROR STACK:', error.stack);
    res.status(500).json({ 
      success: false,
      message: 'Error del servidor: ' + error.message 
    });
  }
});

// 📝 RUTA DE REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body; // ← Mantener username

    console.log('📨 Register attempt for:', username);

    // 1. Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // 2. Crear nuevo usuario
    const user = new User({
      username,
      password, // ← El modelo se encarga del hash
      failedAttempts: 0,
      isBlocked: false
    });

    await user.save();

    console.log('✅ User registered:', user.username);

    // 3. Generar token automáticamente después del registro
    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token: token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('💥 Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor: ' + error.message
    });
  }
});

module.exports = router;