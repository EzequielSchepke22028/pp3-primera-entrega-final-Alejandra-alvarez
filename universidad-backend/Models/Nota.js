const mongoose = require("mongoose");

const notaSchema = new mongoose.Schema({
  materia: {
    type: String,
    required: true,
  },
  nota: {
    type: Number,
    required: true,
  },
  observacion: {
    type: String,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Nota", notaSchema);