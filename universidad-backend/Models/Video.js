const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visto: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);