import './OfertaAcademica.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OfertaAcademica() {
    const [busqueda, setBusqueda] = useState('');
    const [categoria, setCategoria] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [nivel, setNivel] = useState('');
    const navigate = useNavigate();

    // 1. 🎯 DATOS DE CARRERAS CON IMAGEN Y DETALLE
    const carreras = [
        {
            nombre: 'Tecnicatura en Desarrollo Web',
            categoria: 'Informática', // ⚠️ Coherencia con el select: 'Informática'
            modalidad: 'Semipresencial',
            nivel: 'Pregrado',
            duracion: '3 años',
            descripcionCorta: 'Formate profesionales en lenguajes de programación y bases de datos para el desarrollo de sitios y aplicaciones web modernas.',
            imagenSrc: '/imagenes/informatica.png', // Usar la misma imagen de la tarjeta
            rutaDetalle: '/Informatica',
        },
        {
            nombre: 'Tecnicatura en Administración Pública',
            categoria: 'Administración',
            modalidad: 'Presencial',
            nivel: 'Pregrado',
            duracion: '2 años',
            descripcionCorta: 'Capacita para la gestión eficiente de recursos y políticas en organismos gubernamentales y no gubernamentales.',
            imagenSrc: '/imagenes/administracion.png',
            rutaDetalle: '/Administracion',
        },
        {
            nombre: 'Diplomatura en Educación Digital',
            categoria: 'Educación', // Nueva categoría para el ejemplo
            modalidad: 'Virtual',
            nivel: 'Diplomatura',
            duracion: '1 año',
            descripcionCorta: 'Enfocada en el uso de herramientas y metodologías digitales para la enseñanza y el aprendizaje a distancia.',
            imagenSrc: '/imagenes/economia.png', // Ejemplo de imagen
            rutaDetalle: '/EducacionDigital',
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

    // 2. 🚀 FUNCIÓN PARA NAVEGAR AL DETALLE
    const handleVerDetalle = (ruta) => {
        navigate(ruta);
    };

    return (
        <div className="oferta-wrapper">
            <h1>Oferta Académica</h1>

            {/* Filtros */}
            <div className="filtros">
                {/* ... (Tus filtros existentes: input y selects) ... */}
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
               {/*     <option value="Derecho">Derecho</option> */}
               {/*     <option value="Idiomas">Idiomas</option> */}
               {/*     <option value="Economia">Economía</option> */}
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

            <hr/>

            {/* 3. 🖼️ SECCIÓN DE RESULTADOS FILTRADOS */}
            <h2>Resultados ({carrerasFiltradas.length})</h2>
            <div className="carreras-lista">
                {carrerasFiltradas.length === 0 ? (
                    <p>No se encontraron carreras con los filtros seleccionados.</p>
                ) : (
                    // Mapeamos las carreras filtradas
                    carrerasFiltradas.map((carrera, index) => (
                        <div key={index} className="carrera-card-resultado">
                            <div className="carrera-imagen-info">
                                <img 
                                    src={carrera.imagenSrc} 
                                    alt={carrera.nombre} 
                                    className="carrera-imagen"
                                />
                                <div className="carrera-info-texto">
                                    <h3>{carrera.nombre}</h3>
                                    <p><strong>Área:</strong> {carrera.categoria}</p>
                                    <p><strong>Modalidad:</strong> {carrera.modalidad}</p>
                                    <p><strong>Duración:</strong> {carrera.duracion}</p>
                                    <p className="carrera-descripcion">{carrera.descripcionCorta}</p>
                                    
                                    <button 
                                        onClick={() => handleVerDetalle(carrera.rutaDetalle)}
                                        className="btn-detalle"
                                    >
                                        Ver Plan de Estudio
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            <hr/>
            
            {/* Imágenes por área (Dejé esta sección si quieres mantener la navegación rápida) */}
            <div className="areas-visuales">
                {/* ... (Tu código de 'areas-visuales' original para navegación rápida) ... */}
            </div>
        </div>
    );
}

export default OfertaAcademica;

/*import './OfertaAcademica.css';
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

      {/* Filtros *//*}
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

      {/* Imágenes por área *//*}
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

export default OfertaAcademica;*/

/*CCS PRIMERA VERSION PONERLO EN .CSS */

/*/*@media (max-width: 768px) { 
  .oferta-wrapper h1 {
    font-size: 1.8rem;
  }

  .oferta-wrapper {
    padding: 40px 10px;
  }
}


oferta-wrapper {
  background-color: #01032f;         /* fondo institucional *//*
  color: #ffffff;                    /* texto claro *//*
  padding: 60px 20px;                /* espacio interno *//*
  text-align: center;                /* centra el contenido *//*
  border-top: 4px solid #d11212;     /* línea superior institucional *//*
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* sombra elegante *//*
}

.oferta-wrapper h1 {
  font-size: 2.5rem;
  color: #01032f;
  margin: 0;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;

}


.areas-visuales {
  display: flex;              /* ← activa distribución horizontal *//*
  justify-content: center;    /* ← centra las tarjetas *//*
  gap: 2rem;                  /* ← espacio entre ellas */
/*  flex-wrap: wrap;            /* ← permite que bajen si no entran *//*
  margin: 8rem 0;
  margin-left: 0%;
}
 */