const express = require("express");
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
});

module.exports = router;