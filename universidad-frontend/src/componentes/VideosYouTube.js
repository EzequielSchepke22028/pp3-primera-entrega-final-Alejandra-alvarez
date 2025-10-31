import React, { useState, useEffect } from "react";
import "./VideosYouTube.css";

export default function VideosYouTube() {
  const [videos, setVideos] = useState([]);
  const [nuevoVideoTitulo, setNuevoVideoTitulo] = useState("");
  const [nuevoVideoURL, setNuevoVideoURL] = useState("");

  // Función para obtener token
  const getToken = () => {
    return localStorage.getItem('token');
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
    cargarVideosDesdeBackend();
  }, []);

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
          setNuevoVideoTitulo("");
          setNuevoVideoURL("");
          alert('✅ Video guardado para ver después!');
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

  const eliminarVideo = async (videoId) => {
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
        alert('✅ Video eliminado');
        await cargarVideosDesdeBackend();
      }
    } catch (error) {
      console.error('Error eliminando video:', error);
    }
  };

  return (
    <section className="videos-youtube">
      <h2>🎥 Videos para Ver Más Tarde</h2>

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
        {videos.map((video) => (
          <div key={video._id} className="video-item">
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
              onClick={() => eliminarVideo(video._id)}
              className="btn-eliminar-video"
            >
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}