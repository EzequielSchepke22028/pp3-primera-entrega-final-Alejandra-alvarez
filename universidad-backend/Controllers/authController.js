// Importa el modelo de usuario desde la carpeta models
const User = require("../Models/Users");

// Importa la librería bcrypt para encriptar y comparar contraseñas
const bcrypt = require("bcrypt");

// 🔐 Registro de usuario
exports.register = async (req, res) => {
  try {// para capturar errores y si existe alguno lo manda al catch
    const { username, password } = req.body;

    // Validación básica
    if (!username || !password) {
      return res.status(400).send("Faltan datos");
    }

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Usuario ya existe");
    }

    // Encripta la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crea y guarda el nuevo usuario
    const newUser = new User({
      username,
      passwordHash,
      failedAttempts: 0,
      isBlocked: false
    });

    await newUser.save();
    return res.status(201).send("Usuario registrado correctamente.");
  } catch (err) {
    console.error("Error en registro:", err);
    return res.status(500).send("Error interno del servidor");
  }
};

// 🔓 Login de usuario
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("Usuario no encontrado, intente de nuevo");
    }

    if (user.isBlocked) {
      return res.status(403).send("Cuenta bloqueada");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= 3) {
        user.isBlocked = true;
      }
      await user.save();
      return res.status(401).send("Credenciales incorrectas");
    }

    // Login exitoso: reinicia intentos fallidos
    user.failedAttempts = 0;
    await user.save();

    return res.send("Login exitoso");
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).send("Error interno del servidor");
  }
};