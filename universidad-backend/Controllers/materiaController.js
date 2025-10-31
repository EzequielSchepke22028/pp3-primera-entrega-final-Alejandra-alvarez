const Materia = require('../Models/Materia');

// Crear materia
exports.crearMateria = async (req, res) => {
  try {
    const materia = new Materia({
      ...req.body,
      usuarioId: req.user.id
    });
    await materia.save();
    res.status(200).json(materia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las materias
exports.obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find({ usuarioId: req.user.id });
    res.json(materias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener una materia por ID
exports.obtenerMateria = async (req, res) => {
  try {
    const materia = await Materia.findOne({ _id: req.params.id, usuarioId: req.user.id });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.json(materia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar materia
exports.actualizarMateria = async (req, res) => {
  try {
    const materia = await Materia.findOneAndUpdate(
      { _id: req.params.id, usuarioId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.json(materia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar materia
exports.eliminarMateria = async (req, res) => {
  try {
    const materia = await Materia.findOneAndDelete({ _id: req.params.id, usuarioId: req.user.id });
    if (!materia) return res.status(404).json({ error: 'Materia no encontrada' });
    res.json({ mensaje: 'Materia eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
