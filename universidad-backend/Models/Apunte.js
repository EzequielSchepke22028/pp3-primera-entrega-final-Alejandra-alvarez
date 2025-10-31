const mongoose = require('mongoose');

const apunteSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Apunte', apunteSchema);