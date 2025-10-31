const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');

// Ruta temporal para apuntes - usar MongoDB directo
router.get('/apuntes', auth, async (req, res) => {
  try {
    const db = require('mongoose').connection.db;
    const apuntes = await db.collection('apuntes')
      .find({ usuarioId: req.user.id })
      .sort({ creadoEn: -1 })
      .toArray();
    
    res.json({
      success: true,
      data: apuntes
    });
  } catch (error) {
    console.error('Error obteniendo apuntes:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

router.post('/apuntes', auth, async (req, res) => {
  try {
    const db = require('mongoose').connection.db;
    const { titulo, contenido } = req.body;

    const resultado = await db.collection('apuntes').insertOne({
      titulo: titulo || "Sin título",
      contenido: contenido || "",
      usuarioId: req.user.id,
      creadoEn: new Date()
    });

    res.json({
      success: true,
      message: "Apunte guardado",
      id: resultado.insertedId
    });
  } catch (error) {
    console.error('Error guardando apunte:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

module.exports = router;