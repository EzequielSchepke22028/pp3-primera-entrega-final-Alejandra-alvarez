const Nota = require("../Models/Nota");

const crearNota = async (req, res) => {
  try {
    console.log('🟡 Llegó petición a /api/crear');
    console.log('Body recibido:', req.body);
    
    const { materia, nota, observacion, fecha } = req.body;

    if (!materia || !nota) {
      return res.status(400).json({
        success: false,
        error: "Materia y nota son campos obligatorios"
      });
    }

    const nuevaNota = new Nota({
      materia,
      nota: Number(nota),
      observacion: observacion || "",
      fecha: fecha ? new Date(fecha) : new Date()
    });

    const notaGuardada = await nuevaNota.save();

    console.log('✅ Nota guardada en MongoDB:', notaGuardada);

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
};

const obtenerNotas = async (req, res) => {
  try {
    console.log('🟡 Solicitando todas las notas');
    
    const notas = await Nota.find().sort({ fecha: -1 });
    
    console.log('✅ Notas encontradas:', notas.length);
    
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
};

module.exports = {
  crearNota,
  obtenerNotas
};