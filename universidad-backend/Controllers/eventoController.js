const Evento = require('../Models/Evento');

// Crear nuevo evento
exports.crearEvento = async (req, res) => {
  try {
    const evento = new Evento({
      ...req.body,
      usuarioId: req.user.id
    });
    await evento.save();
    res.status(201).json(evento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los eventos del usuario
exports.obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find({ usuarioId: req.user.id });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener eventos por fecha
exports.obtenerEventosPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const startDate = new Date(fecha);
    const endDate = new Date(fecha);
    endDate.setDate(endDate.getDate() + 1);
    
    const eventos = await Evento.find({
      usuarioId: req.user.id,
      fecha: {
        $gte: startDate,
        $lt: endDate
      }
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar evento
exports.actualizarEvento = async (req, res) => {
  try {
    const evento = await Evento.findOneAndUpdate(
      { _id: req.params.id, usuarioId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar evento
exports.eliminarEvento = async (req, res) => {
  try {
    const evento = await Evento.findOneAndDelete({ 
      _id: req.params.id, 
      usuarioId: req.user.id 
    });
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};