import React, { useState } from 'react';
import './Notas.css';


const handleSubmit = async (e) => {
  e.preventDefault();
  
  // AGREGÁ ESTO:
  console.log('🟡 BOTÓN PRESIONADO - handleSubmit ejecutado');
  console.log('Datos del form:', formData);
  
  try {
    // ... resto del código
    
const Notas = () => {
  const [formData, setFormData] = useState({
    materia: '',
    nota: '',
    observacion: '',
    fecha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Enviando nota al backend...');
      
      // PUERTO 3000 - CORRECTO
      const response = await fetch('http://localhost:3000/api/test-notas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materia: formData.materia,
          nota: Number(formData.nota),
          observacion: formData.observacion,
          fecha: formData.fecha
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Nota guardada exitosamente:', result.data);
        alert('¡Nota guardada correctamente en MongoDB!');
        
        setFormData({
          materia: '',
          nota: '',
          observacion: '',
          fecha: ''
        });
      } else {
        console.error('❌ Error al guardar:', result.error);
        alert('Error al guardar la nota: ' + result.error);
      }
      
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="notas-container">
      <h2>Cargar Nueva Nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Materia:</label>
          <input
            type="text"
            name="materia"
            value={formData.materia}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Nota:</label>
          <input
            type="number"
            name="nota"
            value={formData.nota}
            onChange={handleChange}
            min="1"
            max="10"
            step="0.1"
            required
          />
        </div>
        
        <div>
          <label>Observación:</label>
          <input
            type="text"
            name="observacion"
            value={formData.observacion}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Guardar Nota</button>
      </form>
    </div>
  );
};

export default Notas;