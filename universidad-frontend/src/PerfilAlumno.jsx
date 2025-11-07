import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Para leer el ID de la URL

function PerfilAlumno() {
  // 1. Obtener el alumnoId de la URL
  const { alumnoId } = useParams(); 
  
  // 2. Definir estados
  const [promedio, setPromedio] = useState(null); 
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  // 3. Hook para obtener el promedio al cargar y cuando cambie el ID
  useEffect(() => {
    if (!alumnoId) return; // Salir si no hay ID
    
    setCargando(true);
    setError(null);

    // URL del backend (Asegúrate de que la URL sea correcta)
    axios.get(`http://localhost:3000/notas/promedio/${alumnoId}`)
      .then(res => {
        // Asumiendo que res.data.promedio es un número
        setPromedio(res.data.promedio);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al obtener promedio:", err);
        setError("No se pudo cargar el promedio del alumno.");
        setCargando(false);
        setPromedio(null); 
      });
  }, [alumnoId]); 

  // 4. Lógica de renderizado condicional
  if (!alumnoId) {
    return <h2>❌ Error: ID de alumno no especificado.</h2>;
  }
  
  if (cargando) {
    return <h2>⏳ Cargando perfil del alumno {alumnoId}...</h2>;
  }
  
  if (error) {
    return <h2>🛑 {error}</h2>;
  }

  // Si todo está bien:
  return (
    <>
      <h2>📊 Perfil del Alumno: **{alumnoId}**</h2>
      <p>Estado: **Activo**</p>
      {/* Usamos el promedio y aseguramos el formato, solo si es un número */}
      <p>Promedio General: **{typeof promedio === 'number' ? promedio.toFixed(2) : 'N/A'}**</p>
    </>
  );
}

export default PerfilAlumno;