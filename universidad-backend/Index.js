require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const videoRoutes = require('./Routes/videoRoutes');

const app = express();

// ⬇️⬇️⬇️ ESTO PRIMERO - CORS y JSON parsing ⬇️⬇️⬇️
app.use(express.json());
app.use(cors());
app.use('/api', videoRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión:', err));

// RUTAS SIMPLES QUE SÍ FUNCIONAN
app.post('/api/test-apuntes', async (req, res) => {
  try {
    console.log('📝 Guardando apunte:', req.body);
    const db = mongoose.connection.db;
    const resultado = await db.collection('apuntes').insertOne({
      titulo: req.body.titulo || "Sin título",
      contenido: req.body.contenido || "",
      creadoEn: new Date()
    });
    res.json({ success: true, message: "Apunte guardado", id: resultado.insertedId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// 📊 NOTAS ACADÉMICAS
const Nota = require("./Models/Nota");
app.post('/api/test-notas', async (req, res) => {
  try {
    console.log('🟡 Llegó petición a /api/test-notas');
    
    const { materia, nota, observacion, fecha } = req.body;

    const nuevaNota = new Nota({
      materia,
      nota: Number(nota),
      observacion: observacion || "",
      fecha: fecha ? new Date(fecha) : new Date()
    });

    const notaGuardada = await nuevaNota.save();
    console.log('✅ Nota guardada en MongoDB');

    res.status(201).json({
      success: true,
      message: "Nota guardada correctamente",
      data: notaGuardada
    });

  } catch (error) {
    console.error('❌ Error guardando nota:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/test-cargar-notas', async (req, res) => {
  try {
    const notas = await Nota.find().sort({ fecha: -1 });
    res.status(200).json({
      success: true,
      data: notas
    });
  } catch (error) {
    console.error('❌ Error obteniendo notas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/test-eventos', async (req, res) => {
  try {
    console.log('📅 Guardando evento:', req.body);
    const db = mongoose.connection.db;
    const resultado = await db.collection('eventos').insertOne({
      titulo: req.body.titulo || "Evento sin título",
      fecha: new Date(),
      descripcion: "Evento del calendario",
      creadoEn: new Date()
    });
    res.json({ success: true, message: "Evento guardado", id: resultado.insertedId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.get('/api/test-cargar-apuntes', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const apuntes = await db.collection('apuntes').find().toArray();
    res.json({ success: true, data: apuntes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.get('/api/test-cargar-eventos', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const eventos = await db.collection('eventos').find().toArray();
    res.json({ success: true, data: eventos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// ==================== RUTAS DE AUTENTICACIÓN ====================
const authRoutes = require('./Routes/auth');
const materiaRoutes = require('./Routes/materias');
const notaRoutes = require('./Routes/notaRoutes');
const eventoRoutes = require('./Routes/eventos');
const apunteRoutes = require('./Routes/apunteRoutes'); // ← AGREGAR AQUÍ

// Cargar todas las rutas normales
app.use('/api', authRoutes);
app.use('/api', materiaRoutes);
app.use('/api', notaRoutes);
app.use('/api', eventoRoutes);
app.use('/api', apunteRoutes); // ← AGREGAR AQUÍ

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});