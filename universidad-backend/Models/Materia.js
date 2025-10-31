const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  creditos: {
    type: Number,
    default: 3
  },
  profesor: String,
  horario: String,
  descripcion: String,
  nota: Number,
  estado: String,
  condicion: String,
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Materia', materiaSchema);