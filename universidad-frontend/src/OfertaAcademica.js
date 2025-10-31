import './OfertaAcademica.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importación faltante

function OfertaAcademica() {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [nivel, setNivel] = useState('');
  const navigate = useNavigate();

  const carreras = [
    {
      nombre: 'Tecnicatura en Desarrollo Web',
      categoria: 'Informatica',
      modalidad: 'Semipresencial',
      nivel: 'Pregrado',
      duracion: '3 años',
    },
    {
      nombre: 'Tecnicatura en Administración Pública',
      categoria: 'Administración',
      modalidad: 'Presencial',
      nivel: 'Pregrado',
      duracion: '2 años',
    },
    {
      nombre: 'Diplomatura en Educación Digital',
      categoria: 'Educación',
      modalidad: 'Virtual',
      nivel: 'Diplomatura',
      duracion: '1 año',
    },
    // Agregá más carreras según tu oferta
  ];

  const carrerasFiltradas = carreras.filter((carrera) => {
    return (
      carrera.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoria === '' || carrera.categoria === categoria) &&
      (modalidad === '' || carrera.modalidad === modalidad) &&
      (nivel === '' || carrera.nivel === nivel)
    );
  });

  return (
    <div className="oferta-wrapper">
      <h1>Oferta Académica</h1>

      {/* Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar carrera..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas las áreas</option>
          <option value="Informática">Informática</option>
          <option value="Administración">Administración</option>
          <option value="Derecho">Derecho</option>
          <option value="Idiomas">Idiomas</option>
          <option value="Economia">Economia</option>
        </select>

        <select value={modalidad} onChange={(e) => setModalidad(e.target.value)}>
          <option value="">Todas las modalidades</option>
          <option value="Presencial">Presencial</option>
          <option value="Virtual">Virtual</option>
          <option value="Semipresencial">Semipresencial</option>
        </select>

        <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
          <option value="">Todos los niveles</option>
          <option value="Pregrado">Pregrado</option>
          <option value="Diplomatura">Diplomatura</option>
        </select>
      </div>

      {/* Imágenes por área */}
      <div className="areas-visuales">
        <div
          className="area-card"
          onClick={() => {
            setCategoria('Informatica');
            navigate('/Informatica');
          }}
        >
          <img src="/imagenes/informatica.png" alt="Informatica" />
          <p>Informática</p>
        </div>

        <div
          className="area-card"
          onClick={() => {
            setCategoria('Administración');
            navigate('/Administracion');
          }}
        >
          <img src="/imagenes/administracion.png" alt="Administración" />
          <p>Administración</p>
        </div>

        <div
          className="area-card"
          onClick={() => {
            setCategoria('Economia');
            navigate('/Economia');
          }}
        >
          <img src="/imagenes/economia.png" alt="Economía" />
          <p>Economía</p>
        </div>

        <div
          className="area-card"
          onClick={() => {
            setCategoria('Idiomas');
            navigate('/Idiomas');
          }}
        >
          <img src="/imagenes/idiomas.png" alt="Idiomas" />
          <p>Idiomas</p>
        </div>

        <div
          className="area-card"
          onClick={() => {
            setCategoria('Derecho');
            navigate('/Derecho');
          }}
        >
          <img src="/imagenes/derecho.png" alt="Derecho" />
          <p>Derecho</p>
        </div>
      </div>
    </div>
  );
}

export default OfertaAcademica;