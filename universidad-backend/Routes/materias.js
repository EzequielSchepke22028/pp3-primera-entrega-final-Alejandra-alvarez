const express = require('express');
const router = express.Router();
const materiaController = require('../Controllers/materiaController');
const auth = require('../Middleware/auth');

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas CRUD para materias
router.post('/materias', materiaController.crearMateria);
router.get('/materias', materiaController.obtenerMaterias);
router.get('/materias/:id', materiaController.obtenerMateria);
router.put('/materias/:id', materiaController.actualizarMateria);
router.delete('/materias/:id', materiaController.eliminarMateria);

module.exports = router;