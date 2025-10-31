import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./CalendarioWidget.css";

export default function CalendarioWidget() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventos, setEventos] = useState({});
  const [nuevoEvento, setNuevoEvento] = useState("");

  const [videos, setVideos] = useState([]);
  const [nuevoVideoTitulo, setNuevoVideoTitulo] = useState("");
  const [nuevoVideoURL, setNuevoVideoURL] = useState("");

  // Función para obtener token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Cargar eventos del USUARIO ACTUAL desde MongoDB
  const cargarEventosDesdeBackend = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.log('⚠️ No hay token, no se pueden cargar eventos');
        return;
      }

      const response = await fetch('http://localhost:3000/api/eventos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Organizar eventos por fecha
        const eventosOrganizados = {};
        result.data.forEach(evento => {
          const fechaClave = new Date(evento.fecha).toDateString();
          if (!eventosOrganizados[fechaClave]) {
            eventosOrganizados[fechaClave] = [];
          }
          eventosOrganizados[fechaClave].push({
            id: evento._id,
            titulo: evento.titulo,
            fecha: evento.fecha
          });
        });
        setEventos(eventosOrganizados);
        console.log('✅ Eventos cargados para usuario:', Object.keys(eventosOrganizados).length);
      }
    } catch (error) {
      console.error('❌ Error cargando eventos:', error);
    }
  };

  // Cargar VIDEOS del USUARIO ACTUAL desde MongoDB
  const cargarVideosDesdeBackend = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.log('⚠️ No hay token, no se pueden cargar videos');
        return;
      }

      const response = await fetch('http://localhost:3000/api/videos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setVideos(result.data);
        console.log('✅ Videos cargados para usuario:', result.data.length);
      }
    } catch (error) {
      console.error('❌ Error cargando videos:', error);
    }
  };

  useEffect(() => {
    cargarEventosDesdeBackend();
    cargarVideosDesdeBackend();
  }, []);

  const agregarEvento = async () => {
    if (!nuevoEvento.trim()) return;

    try {
      const token = getToken();
      if (!token) {
        alert("Error: No estás autenticado");
        return;
      }

      const response = await fetch('http://localhost:3000/api/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: nuevoEvento,
          fecha: fechaSeleccionada,
          descripcion: "Evento del calendario",
          tipo: 'personal'
        })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Actualizar estado local
        const fechaClave = fechaSeleccionada.toDateString();
        const eventosActuales = eventos[fechaClave] || [];
        const actualizados = {
          ...eventos,
          [fechaClave]: [...eventosActuales, { 
            id: result.data._id, 
            titulo: nuevoEvento,
            fecha: fechaSeleccionada
          }],
        };
        setEventos(actualizados);
        setNuevoEvento("");
        alert('✅ Evento guardado correctamente!');
        
        // Recargar eventos desde backend para asegurar consistencia
        await cargarEventosDesdeBackend();
      } else {
        alert('❌ Error al guardar evento: ' + result.error);
      }

    } catch (error) {
      console.error('❌ Error de conexión:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const eliminarEvento = async (eventoId, fechaClave, index) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`http://localhost:3000/api/eventos/${eventoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Actualizar estado local
        const eventosActualizados = { ...eventos };
        eventosActualizados[fechaClave] = eventosActualizados[fechaClave].filter((_, i) => i !== index);
        
        if (eventosActualizados[fechaClave].length === 0) {
          delete eventosActualizados[fechaClave];
        }
        
        setEventos(eventosActualizados);
        alert('✅ Evento eliminado');
      }
    } catch (error) {
      console.error('Error eliminando evento:', error);
    }
  };

  const extraerVideoID = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  const agregarVideo = async () => {
    const id = extraerVideoID(nuevoVideoURL);
    if (id && nuevoVideoTitulo.trim()) {
      try {
        const token = getToken();
        if (!token) {
          alert("Error: No estás autenticado");
          return;
        }

        const response = await fetch('http://localhost:3000/api/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            titulo: nuevoVideoTitulo,
            url: nuevoVideoURL,
            videoId: id
          })
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          // Agregar a la lista local
          setVideos([...videos, result.data]);
          setNuevoVideoTitulo("");
          setNuevoVideoURL("");
          alert('✅ Video guardado para ver después!');
          
          // Recargar videos desde backend
          await cargarVideosDesdeBackend();
        }
      } catch (error) {
        console.error('Error guardando video:', error);
        alert('Error al guardar el video');
      }
    } else {
      alert('URL de YouTube inválida o título vacío');
    }
  };

  const eliminarVideo = async (videoId, index) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`http://localhost:3000/api/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Actualizar estado local
        const videosActualizados = videos.filter((_, i) => i !== index);
        setVideos(videosActualizados);
        alert('✅ Video eliminado');
        
        // Recargar videos desde backend
        await cargarVideosDesdeBackend();
      }
    } catch (error) {
      console.error('Error eliminando video:', error);
    }
  };

  return (
    <aside className="calendario">
      <h4>Calendario</h4>
      <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
      />

      <div className="evento-form">
        <p><strong>{fechaSeleccionada.toLocaleDateString('es-AR')}</strong></p>
        <input
          type="text"
          value={nuevoEvento}
          onChange={(e) => setNuevoEvento(e.target.value)}
          placeholder="Agregar recordatorio"
        />
        <button onClick={agregarEvento}>Agregar</button>
      </div>

      <ul className="lista-eventos">
        {(eventos[fechaSeleccionada.toDateString()] || []).map((ev, i) => (
          <li key={ev.id || i}>
            📝 {ev.titulo}
            <button 
              onClick={() => eliminarEvento(ev.id, fechaSeleccionada.toDateString(), i)}
              className="btn-eliminar-evento"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {/* Sección dinámica de videos */}
      <section className="videos-interes">
        <h4>🎥 Videos de YouTube de interés</h4>

        <div className="formulario-video">
          <input
            type="text"
            value={nuevoVideoTitulo}
            onChange={(e) => setNuevoVideoTitulo(e.target.value)}
            placeholder="Título del video"
          />
          <input
            type="text"
            value={nuevoVideoURL}
            onChange={(e) => setNuevoVideoURL(e.target.value)}
            placeholder="URL de YouTube"
          />
          <button onClick={agregarVideo}>Agregar video</button>
        </div>

        <div className="lista-videos">
          {videos.map((video, index) => (
            <div key={video._id || index} className="video-item">
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={`Miniatura de ${video.titulo}`}
                  className="video-thumb"
                />
                <p>{video.titulo}</p>
              </a>
              <button 
                onClick={() => eliminarVideo(video._id, index)}
                className="btn-eliminar-video"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}