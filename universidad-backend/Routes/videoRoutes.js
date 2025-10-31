const express = require('express');
const router = express.Router();
const Video = require('../Models/Video');
const auth = require('../Middleware/auth');

// Obtener todos los videos del usuario
router.get('/videos', auth, async (req, res) => {
  try {
    const videos = await Video.find({ usuarioId: req.user.id })
                             .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: videos
    });
  } catch (error) {
    console.error('Error obteniendo videos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Agregar nuevo video
router.post('/videos', auth, async (req, res) => {
  try {
    const { titulo, url, videoId } = req.body;

    const video = new Video({
      titulo,
      url,
      videoId,
      usuarioId: req.user.id
    });

    await video.save();

    res.status(201).json({
      success: true,
      message: 'Video guardado para ver después',
      data: video
    });
  } catch (error) {
    console.error('Error guardando video:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Marcar video como visto
router.put('/videos/:id/visto', auth, async (req, res) => {
  try {
    const video = await Video.findOne({ 
      _id: req.params.id, 
      usuarioId: req.user.id 
    });

    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }

    video.visto = true;
    await video.save();

    res.json({
      success: true,
      message: 'Video marcado como visto'
    });
  } catch (error) {
    console.error('Error actualizando video:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Eliminar video
router.delete('/videos/:id', auth, async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({ 
      _id: req.params.id, 
      usuarioId: req.user.id 
    });

    if (!video) {
      return res.status(404).json({ error: 'Video no encontrado' });
    }

    res.json({
      success: true,
      message: 'Video eliminado'
    });
  } catch (error) {
    console.error('Error eliminando video:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;