import React, { useState, useEffect } from "react";
import "./NotaEducativa.css";

export default function NotaEducativa() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [cargando, setCargando] = useState(true);

  // Función para obtener token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Cargar el último apunte del USUARIO ACTUAL
  const cargarUltimoApunte = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.log('⚠️ No hay token, no se pueden cargar apuntes');
        setCargando(false);
        return;
      }

      console.log('📥 Cargando apuntes del usuario...');
      const response = await fetch('http://localhost:3000/api/apuntes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success && result.data.length > 0) {
        // Ordenar por fecha y tomar el más reciente
        const apuntesOrdenados = result.data.sort((a, b) => 
          new Date(b.creadoEn) - new Date(a.creadoEn)
        );
        const ultimoApunte = apuntesOrdenados[0];
        
        console.log('✅ Último apunte cargado:', ultimoApunte);
        setTitulo(ultimoApunte.titulo || "");
        setContenido(ultimoApunte.contenido || "");
      } else {
        console.log('📭 No hay apuntes guardados para este usuario');
      }
    } catch (error) {
      console.error('❌ Error cargando apuntes:', error);
    } finally {
      setCargando(false);
    }
  };

  // Cargar al iniciar el componente
  useEffect(() => {
    cargarUltimoApunte();
  }, []);

  const guardarNota = async () => {
    if (!contenido.trim()) {
      alert("Escribe algo antes de guardar");
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        alert("Error: No estás autenticado");
        return;
      }

      console.log("💾 Guardando apunte para usuario actual...");
      
      const response = await fetch('http://localhost:3000/api/apuntes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: titulo || "Apunte sin título",
          contenido: contenido
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Apunte guardado exitosamente para usuario actual');
        alert('¡Apunte guardado correctamente!');
        // Recargar los apuntes para mostrar el último guardado
        await cargarUltimoApunte();
      } else {
        alert('Error al guardar: ' + (result.error || "Error desconocido"));
      }
      
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      alert('Error de conexión: ' + error.message);
    }
  };

  const limpiarNota = () => {
    if (window.confirm("¿Estás seguro de que quieres limpiar el apunte?")) {
      setTitulo("");
      setContenido("");
    }
  };

  if (cargando) {
    return (
      <section className="bloc-notas">
        <div className="cargando">Cargando apuntes...</div>
      </section>
    );
  }

  return (
    <section className="bloc-notas">
      <header className="bloc-header">
        <input
          type="text"
          placeholder="Título del apunte (opcional)"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="titulo-input"
        />
      </header>

      <div className="editor-simple">
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe tus apuntes aquí..."
          className="textarea-contenido"
          rows="15"
        />
      </div>

      <div className="acciones">
        <button onClick={guardarNota} className="btn-guardar">
          💾 Guardar Apunte
        </button>
        <button onClick={limpiarNota} className="btn-limpiar">
          🗑️ Limpiar Todo
        </button>
        <button onClick={cargarUltimoApunte} className="btn-recargar">
          🔄 Recargar
        </button>
      </div>

      {contenido && (
        <div className="contador-caracteres">
          {contenido.length} caracteres - {contenido.split(/\s+/).filter(word => word.length > 0).length} palabras
        </div>
      )}
    </section>
  );
}