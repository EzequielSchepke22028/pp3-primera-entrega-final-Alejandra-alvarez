const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: String,
  fecha: {
    type: Date,
    required: true
  },
  hora: String,
  tipo: {
    type: String,
    enum: ['examen', 'tarea', 'clase', 'personal', 'otros'],
    default: 'personal'
  },
  materia: String,
  completado: {
    type: Boolean,
    default: false
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evento', eventoSchema);