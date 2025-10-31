const mongoose = require('mongoose');

const eventoCalendarioSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    fecha: { type: Date, required: true },
    descripcion: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventoCalendario', eventoCalendarioSchema);