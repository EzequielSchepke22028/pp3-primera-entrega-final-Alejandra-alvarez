const express = require("express");
const router = express.Router();
const Nota = require("../Models/Nota");
const auth = require('../Middleware/auth');

// --- RUTAS DE GESTIÓN DE NOTAS (Requieren Autenticación) ---

// Obtener todas las notas DEL USUARIO AUTENTICADO
router.get("/", auth, async (req, res) => { // Corregido: La ruta base es '/' si el router se usa en '/notas'
  try {
    // Usamos req.user.id para asegurar que solo se muestren las notas del usuario logueado
    const notas = await Nota.find({ usuarioId: req.user.id }).sort({ fecha: -1 });
    
    res.json({
      success: true,
      data: notas
    });
  } catch (error) {
    console.error('Error obteniendo notas:', error);
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva nota PARA EL USUARIO AUTENTICADO
router.post("/", auth, async (req, res) => { // Corregido: La ruta base es '/'
  try {
    const { materia, nota, observacion, fecha } = req.body;

    const nuevaNota = new Nota({
      materia,
      nota: Number(nota),
      observacion: observacion || "",
      fecha: fecha ? new Date(fecha) : new Date(),
      usuarioId: req.user.id // ← Asignar el ID del usuario autenticado
    });

    const notaGuardada = await nuevaNota.save();

    res.status(201).json({
      success: true,
      message: "Nota guardada correctamente",
      data: notaGuardada
    });
  } catch (error) {
    console.error('Error guardando nota:', error);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar nota SOLO SI PERTENECE AL USUARIO
router.delete("/:id", auth, async (req, res) => { // Corregido: La ruta es '/:id'
  try {
    const nota = await Nota.findOneAndDelete({ 
      _id: req.params.id, 
      usuarioId: req.user.id // ← Solo eliminar si es del usuario
    });

    if (!nota) {
      // 404 si no existe O 403 si existe pero no pertenece al usuario (no fue eliminada)
      return res.status(404).json({ error: 'Nota no encontrada o no tienes permiso para eliminarla' });
    }

    res.json({
      success: true,
      message: 'Nota eliminada correctamente'
    });
  } catch (error) {
    console.error('Error eliminando nota:', error);
    res.status(500).json({ error: error.message });
  }
});


// --- RUTA DE CÁLCULO DE PROMEDIO (Para el Perfil de Alumno) ---
// NOTA: Esta ruta NO requiere 'auth' si está diseñada para ser pública o para un backend diferente.

router.get('/promedio/:alumnoId', async (req, res) => {
  const { alumnoId } = req.params;
  
  try {
    // ⚠️ Importante: Asegúrate de que el campo en tu modelo 'Nota' sea 'usuarioId' o 'alumnoId'
    // Según tu lógica anterior, el campo usado para guardar fue 'usuarioId'.
    // Usaremos 'usuarioId' para el $match.
    
    const resultado = await Nota.aggregate([
      // $match: Filtrar por el ID del alumno/usuario
      { $match: { usuarioId: alumnoId } }, 
      // $group: Calcular el promedio de las notas
      { $group: { 
          _id: null, 
          promedio: { $avg: "$nota" } 
      } }
    ]);
    
    // Si resultado está vacío (el alumno no tiene notas), devolvemos 0
    const promedioFinal = resultado.length > 0 ? resultado[0].promedio : 0;
    
    res.json({ 
        success: true, 
        promedio: promedioFinal
    });
    
  } catch (error) {
    console.error("Error al calcular promedio:", error);
    res.status(500).json({ 
        success: false, 
        message: "Error interno del servidor al obtener promedio." 
    });
  }
});

module.exports = router;

/*const express = require("express");
const router = express.Router();
const Nota = require("../Models/Nota");
const auth = require('../Middleware/auth');

// Obtener todas las notas DEL USUARIO AUTENTICADO
router.get("/notas", auth, async (req, res) => {
  try {
    const notas = await Nota.find({ usuarioId: req.user.id }).sort({ fecha: -1 });
    
    res.json({
      success: true,
      data: notas
    });
  } catch (error) {
    console.error('Error obteniendo notas:', error);
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva nota PARA EL USUARIO AUTENTICADO
router.post("/notas", auth, async (req, res) => {
  try {
    const { materia, nota, observacion, fecha } = req.body;

    const nuevaNota = new Nota({
      materia,
      nota: Number(nota),
      observacion: observacion || "",
      fecha: fecha ? new Date(fecha) : new Date(),
      usuarioId: req.user.id  // ← Asignar el ID del usuario autenticado
    });

    const notaGuardada = await nuevaNota.save();

    res.status(201).json({
      success: true,
      message: "Nota guardada correctamente",
      data: notaGuardada
    });
  } catch (error) {
    console.error('Error guardando nota:', error);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar nota SOLO SI PERTENECE AL USUARIO
router.delete("/notas/:id", auth, async (req, res) => {
  try {
    const nota = await Nota.findOneAndDelete({ 
      _id: req.params.id, 
      usuarioId: req.user.id  // ← Solo eliminar si es del usuario
    });

    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    res.json({
      success: true,
      message: 'Nota eliminada correctamente'
    });
  } catch (error) {
    console.error('Error eliminando nota:', error);
    res.status(500).json({ error: error.message });
  }

  // Sacar Promedio General

  router.get('/promedio/:alumnoId', async (req, res) => {
  const { alumnoId } = req.params;
    try {
      const resultado = await Nota.aggregate([
        { $match: { alumnoId } },
        { $group: { _id: null, promedio: { $avg: "$nota" } } }
      ]);
    res.json({ promedio: resultado[0]?.promedio || 0 });
    } catch (error) {
    res.status(500).json({ error: 'Error al calcular promedio' });
  }
  let promedioCalculado;
        if (alumnoId === '123') {
            promedioCalculado = 8.541; // Ejemplo para alumno 123
        } else if (alumnoId === '456') {
            promedioCalculado = 6.99; // Ejemplo para alumno 456
        } else {
            // Si el alumno no existe o no tiene notas
            promedioCalculado = 0; 
        }
          res.json({ 
            success: true, 
            promedio: promedioCalculado // Debe ser un número
        });
        

  });



});

module.exports = router; */