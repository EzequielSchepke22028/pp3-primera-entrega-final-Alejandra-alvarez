import React, { useState, useEffect } from "react";
import "./TablaDeNotas.css";
import * as XLSX from "xlsx";

function TablaDeNotas({ materias: materiasProp, setMaterias: setMateriasProp }) {
  // 🎯 USAR PROPS SI EXISTEN, SINO ESTADO LOCAL
  const [materiasInternas, setMateriasInternas] = useState([
    // 📘 1º Año
    { id: 101, anio: 1, correlativas: "-", nombre: "Matemática", nota: "", estado: "", condicion: "" },
    { id: 102, anio: 1, correlativas: "-", nombre: "Lógica", nota: "", estado: "", condicion: "" },
    { id: 103, anio: 1, correlativas: "-", nombre: "Introducción a la Programación", nota: "", estado: "", condicion: "" },
    { id: 104, anio: 1, correlativas: "-", nombre: "Arquitectura de Computadoras", nota: "", estado: "", condicion: "" },
    { id: 105, anio: 1, correlativas: "-", nombre: "Inglés Técnico I", nota: "", estado: "", condicion: "" },
    { id: 106, anio: 1, correlativas: "-", nombre: "Práctica Profesionalizante I", nota: "", estado: "", condicion: "" },

    // 📗 2º Año
    { id: 201, anio: 2, correlativas: "101, 103", nombre: "Programación I", nota: "", estado: "", condicion: "" },
    { id: 202, anio: 2, correlativas: "101", nombre: "Estadística", nota: "", estado: "", condicion: "" },
    { id: 203, anio: 2, correlativas: "104", nombre: "Sistemas Operativos", nota: "", estado: "", condicion: "" },
    { id: 204, anio: 2, correlativas: "102", nombre: "Bases de Datos", nota: "", estado: "", condicion: "" },
    { id: 205, anio: 2, correlativas: "105", nombre: "Inglés Técnico II", nota: "", estado: "", condicion: "" },
    { id: 206, anio: 2, correlativas: "106", nombre: "Práctica Profesionalizante II", nota: "", estado: "", condicion: "" },

    // 📙 3º Año
    { id: 301, anio: 3, correlativas: "201", nombre: "Programación II", nota: "", estado: "", condicion: "" },
    { id: 302, anio: 3, correlativas: "204", nombre: "Análisis de Sistemas", nota: "", estado: "", condicion: "" },
    { id: 303, anio: 3, correlativas: "203", nombre: "Redes y Comunicaciones", nota: "", estado: "", condicion: "" },
    { id: 304, anio: 3, correlativas: "202", nombre: "Gestión de Proyectos", nota: "", estado: "", condicion: "" },
    { id: 305, anio: 3, correlativas: "205", nombre: "Inglés Técnico III", nota: "", estado: "", condicion: "" },
    { id: 306, anio: 3, correlativas: "206", nombre: "Práctica Profesionalizante III", nota: "", estado: "", condicion: "" },
  ]);

  // 🎯 DECIDIR QUÉ DATOS USAR
  const usarProps = materiasProp && setMateriasProp;
  const materias = usarProps ? materiasProp : materiasInternas;
  const setMaterias = usarProps ? setMateriasProp : setMateriasInternas;

  const [modoEdicion, setModoEdicion] = useState({});
  
  // 🎯 ESTADOS PARA FILTROS
  const [filtroAnio, setFiltroAnio] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // ✅ FUNCIÓN PARA GUARDAR EN LOCALSTORAGE
  const guardarEnLocalStorage = (materiasActualizadas) => {
    try {
      localStorage.setItem('materias-notas', JSON.stringify(materiasActualizadas));
      console.log('💾 Guardado en localStorage:', materiasActualizadas.length, 'materias');
      
      // 🎯 FORZAR EVENTO DE STORAGE PARA QUE SIDEBAR LO DETECTE
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('❌ Error guardando en localStorage:', error);
    }
  };

  // ✅ FUNCIÓN DE FILTRADO
  const materiasFiltradas = materias.filter(materia => {
    const coincideAnio = filtroAnio === 'todos' || materia.anio.toString() === filtroAnio;
    const coincideEstado = filtroEstado === 'todos' || materia.estado === filtroEstado;
    const coincideBusqueda = materia.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    return coincideAnio && coincideEstado && coincideBusqueda;
  });

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltroAnio('todos');
    setFiltroEstado('todos');
    setBusqueda('');
  };

  // ✅ FUNCIÓN DE EXPORTAR EXCEL
  const exportarNotasAExcel = () => {
    const datosParaExcel = materias.map((materia) => ({
      ID: materia.id,
      Año: materia.anio,
      Materia: materia.nombre,
      Correlativas: materia.correlativas,
      Nota: materia.nota,
      Estado: materia.estado,
      Condición: materia.condicion,
    }));

    const hoja = XLSX.utils.json_to_sheet(datosParaExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Notas");

    XLSX.writeFile(libro, "LibretaVirtual.xlsx");
  };

  // Función para obtener el token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Función para determinar estado automáticamente según la nota
  const determinarEstado = (nota) => {
    if (!nota || nota.trim() === "") return "";
    
    const notaNumerica = parseFloat(nota);
    if (isNaN(notaNumerica)) return "Valor incorrecto";
    if (notaNumerica > 10) return "Valor incorrecto";
    if (notaNumerica >= 7) return "Promocionada";
    if (notaNumerica >= 4) return "A final";
    return "Desaprobada-Recursar";
  };

  // Función para CARGAR notas desde MongoDB (RUTA PROTEGIDA)
  const cargarNotasDesdeBackend = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error('❌ No hay token de autenticación');
        return;
      }

      const response = await fetch('http://localhost:3000/api/notas', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        const notasGuardadas = result.data;
        console.log('✅ Notas cargadas del usuario:', notasGuardadas.length);
        
        const materiasActualizadas = materias.map(materia => {
          const notaGuardada = notasGuardadas.find(nota => nota.materia === materia.nombre);
          if (notaGuardada) {
            return { 
              ...materia, 
              nota: notaGuardada.nota.toString(),
              estado: determinarEstado(notaGuardada.nota.toString()),
              fecha: new Date(notaGuardada.fecha).toLocaleDateString('es-AR')
            };
          }
          return materia;
        });
        
        setMaterias(materiasActualizadas);
        // 🎯 GUARDAR EN LOCALSTORAGE
        guardarEnLocalStorage(materiasActualizadas);
      }

    } catch (error) {
      console.error('❌ Error cargando notas:', error);
    }
  };

  // Cargar notas al iniciar
  useEffect(() => {
    cargarNotasDesdeBackend();
    
    // 🎯 GUARDAR DATOS INICIALES EN LOCALSTORAGE
    guardarEnLocalStorage(materias);
  }, []);

  // Función para GUARDAR nota en MongoDB (RUTA PROTEGIDA)
  const guardarNotaEnBackend = async (materia) => {
    try {
      // Solo guardar si hay una nota válida
      if (!materia.nota || materia.nota.trim() === "" || isNaN(parseFloat(materia.nota))) {
        return;
      }

      const token = getToken();
      if (!token) {
        console.error('❌ No hay token de autenticación');
        return;
      }

      const bodyToSend = {
        materia: materia.nombre,
        nota: parseFloat(materia.nota),
        observacion: `Nota de ${materia.nombre} - Año ${materia.anio}`,
        fecha: new Date()
      };

      const response = await fetch('http://localhost:3000/api/notas', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bodyToSend)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log('✅ Nota guardada para usuario actual');
        // Actualizar fecha localmente
        const materiasActualizadas = materias.map(m => 
          m.id === materia.id 
            ? { ...m, fecha: new Date().toLocaleDateString('es-AR') }
            : m
        );
        setMaterias(materiasActualizadas);
        // 🎯 GUARDAR EN LOCALSTORAGE
        guardarEnLocalStorage(materiasActualizadas);
      }

    } catch (error) {
      console.error('❌ Error guardando nota:', error);
    }
  };

  const toggleEdicion = (id, campo) => {
    const clave = `${id}-${campo}`;
    const nuevoModo = !modoEdicion[clave];
    
    setModoEdicion((prev) => ({
      ...prev,
      [clave]: nuevoModo
    }));

    // Si estamos terminando la edición (click en GUARDAR), guardar
    if (!nuevoModo && campo === "nota") {
      const materia = materias.find(m => m.id === id);
      if (materia) {
        guardarNotaEnBackend(materia);
      }
    }
  };

  const manejarCambio = (id, campo, valor) => {
    const nuevasMaterias = materias.map((materia) =>
      materia.id === id ? { ...materia, [campo]: valor } : materia
    );

    const materiaEditada = nuevasMaterias.find((m) => m.id === id);

    if (campo === "nota") {
      // Determinar estado automáticamente según la nota
      materiaEditada.estado = determinarEstado(valor);
    }

    setMaterias(nuevasMaterias);
    
    // 🎯 GUARDAR EN LOCALSTORAGE CADA CAMBIO
    guardarEnLocalStorage(nuevasMaterias);
  };

  // 🎯 FUNCIÓN ACTUALIZADA PARA RENDERIZAR TABLAS CON FILTROS
  const renderTablaPorAnio = (anio, color, titulo) => {
    const materiasDelAnio = materiasFiltradas.filter((materia) => materia.anio === anio);
    
    // Si no hay materias que coincidan con el filtro para este año, no mostrar la tabla
    if (materiasDelAnio.length === 0) {
      return null;
    }

    return (
      <section className="tabla-materias">
        <h3>{`${color} ${titulo}`}</h3>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Correlativa/s</th>
              <th>Materia</th>
              <th>Nota</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {materiasDelAnio.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>
                  <div className="campo-editable">
                    <input
                      type="text"
                      value={materia.correlativas}
                      readOnly={!modoEdicion[`${materia.id}-correlativas`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-correlativas`] ? "editable correlativas-editable" : "correlativas-bloqueado"}`}
                      onChange={(e) => manejarCambio(materia.id, "correlativas", e.target.value)}
                    />
                    <button 
                      onClick={() => toggleEdicion(materia.id, "correlativas")} 
                      className="lapiz-btn"
                    >       
                      {modoEdicion[`${materia.id}-correlativas`] ? "✔️" : "✏️"}
                    </button>
                  </div>
                </td>
                <td className="columna-grisada">{materia.nombre}</td>
                <td>
                  <div className="campo-editable" style={{ gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={materia.nota}
                      readOnly={!modoEdicion[`${materia.id}-nota`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-nota`] ? "editable" : "nota-bloqueada"}`}
                      onChange={(e) => manejarCambio(materia.id, "nota", e.target.value)}
                      style={{ 
                        width: '80px',
                        height: '30px',
                        fontSize: '16px',
                        textAlign: 'center',
                        border: modoEdicion[`${materia.id}-nota`] ? '3px solid #007bff' : '2px solid #ccc',
                        background: modoEdicion[`${materia.id}-nota`] ? '#e6f7ff' : '#f8f9fa',
                        borderRadius: '5px',
                        padding: '5px',
                        color: '#000',
                        marginRight: '0'
                      }}
                    />
                    <button 
                      onClick={() => toggleEdicion(materia.id, "nota")} 
                      style={{ 
                        background: modoEdicion[`${materia.id}-nota`] ? '#28a745' : '#17a2b8',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        minWidth: '80px'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      {modoEdicion[`${materia.id}-nota`] ? "GUARDAR" : "EDITAR"}
                    </button>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    value={materia.fecha}
                    readOnly
                    style={{
                      width: '100px',
                      textAlign: 'center',
                      border: '1px solid #ddd',
                      background: '#f8f9fa',
                      borderRadius: '3px',
                      padding: '5px',
                      fontSize: '12px'
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={materia.estado}
                    readOnly
                    style={{
                      width: '150px',
                      textAlign: 'center',
                      border: '1px solid #ddd',
                      background: '#f8f9fa',
                      borderRadius: '3px',
                      padding: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: materia.estado === "Promocionada" ? 'green' : 
                             materia.estado === "A final" ? 'orange' : 
                             materia.estado === "Desaprobada-Recursar" ? 'red' : 
                             materia.estado === "Valor incorrecto" ? 'purple' : 'black'
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };

  return (
    <div>
      {/* ✅ BOTÓN EXCEL */}
      <button onClick={exportarNotasAExcel} className="boton-exportar">
        📤 Exportar a Excel
      </button>
      
      <h2 className="titulo-libreta">MI LIBRETA VIRTUAL</h2>

      {/* 🎯 SECCIÓN DE FILTROS */}
      <div className="filtros-container">
        <h3>🔍 Filtros de Materias</h3>
        
        {/* Búsqueda por nombre */}
        <div className="filtro-group">
          <input 
            type="text" 
            placeholder="Buscar materia por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="filtro-busqueda"
          />
        </div>

        {/* Filtros por select */}
        <div className="filtros-row">
          <div className="filtro-group">
            <label>Año:</label>
            <select value={filtroAnio} onChange={(e) => setFiltroAnio(e.target.value)}>
              <option value="todos">Todos los años</option>
              <option value="1">1º Año</option>
              <option value="2">2º Año</option>
              <option value="3">3º Año</option>
            </select>
          </div>

          <div className="filtro-group">
            <label>Estado:</label>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="todos">Todos los estados</option>
              <option value="Promocionada">✅ Promocionada</option>
              <option value="A final">📝 A final</option>
              <option value="Desaprobada-Recursar">❌ Desaprobada</option>
              <option value="">📚 Sin nota</option>
            </select>
          </div>
        </div>

        {/* Contador y botón limpiar */}
        <div className="filtros-info">
          
          <button onClick={limpiarFiltros} className="btn-limpiar">
            🗑️ Limpiar filtros
          </button>
        </div>
      </div>

      {/* 📊 TABLAS FILTRADAS */}
      {renderTablaPorAnio(1, "📘", "1º Año Analisis de Sistemas - IFTS 4")}
      {renderTablaPorAnio(2, "📗", "2º Año Analisis de Sistemas - IFTS 4")}
      {renderTablaPorAnio(3, "📙", "3º Año Analisis de Sistemas - IFTS 4")}
    </div>
  );
}

export default TablaDeNotas;