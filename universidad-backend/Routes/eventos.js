const express = require('express');
const router = express.Router();
const Evento = require('../Models/Evento');
const auth = require('../Middleware/auth');

// Obtener todos los eventos DEL USUARIO AUTENTICADO
router.get('/eventos', auth, async (req, res) => {
  try {
    const eventos = await Evento.find({ usuarioId: req.user.id }).sort({ fecha: 1 });
    
    res.json({
      success: true,
      data: eventos
    });
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Crear nuevo evento PARA EL USUARIO AUTENTICADO
router.post('/eventos', auth, async (req, res) => {
  try {
    const { titulo, descripcion, fecha, hora, tipo, materia } = req.body;

    const evento = new Evento({
      titulo,
      descripcion: descripcion || "",
      fecha: new Date(fecha),
      hora: hora || "",
      tipo: tipo || 'personal',
      materia: materia || "",
      usuarioId: req.user.id  // ← Asignar el ID del usuario autenticado
    });

    await evento.save();

    res.status(201).json({
      success: true,
      message: 'Evento guardado exitosamente',
      data: evento
    });
  } catch (error) {
    console.error('Error guardando evento:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Actualizar evento SOLO SI PERTENECE AL USUARIO
router.put('/eventos/:id', auth, async (req, res) => {
  try {
    const evento = await Evento.findOne({ 
      _id: req.params.id, 
      usuarioId: req.user.id  // ← Solo actualizar si es del usuario
    });

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    Object.assign(evento, req.body);
    await evento.save();

    res.json({
      success: true,
      message: 'Evento actualizado',
      data: evento
    });
  } catch (error) {
    console.error('Error actualizando evento:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Eliminar evento SOLO SI PERTENECE AL USUARIO
router.delete('/eventos/:id', auth, async (req, res) => {
  try {
    const evento = await Evento.findOneAndDelete({ 
      _id: req.params.id, 
      usuarioId: req.user.id  // ← Solo eliminar si es del usuario
    });

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json({
      success: true,
      message: 'Evento eliminado'
    });
  } catch (error) {
    console.error('Error eliminando evento:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;