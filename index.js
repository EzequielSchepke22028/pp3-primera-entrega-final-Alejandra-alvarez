const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/materias', (req, res) => {
  res.json([
    { nombre: 'Matemáticas', codigo: 'MAT101' },
    { nombre: 'Programación', codigo: 'PRO102' },
  ]);
});

app.listen(3001, () => {
  console.log('Servidor backend corriendo en http://localhost:3001');
});