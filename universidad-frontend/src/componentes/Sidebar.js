import React, { useState, useEffect } from "react";
import NotaEducativa from "./NotaEducativa";
import "./Sidebar.css";

function Sidebar() {
  const [materias, setMaterias] = useState([]);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(Date.now());

  // 🎯 CARGAR Y ESCUCHAR CAMBIOS
  useEffect(() => {
    const cargarMaterias = () => {
      try {
        const materiasGuardadas = localStorage.getItem('materias-notas');
        
        if (materiasGuardadas) {
          const materiasParseadas = JSON.parse(materiasGuardadas);
          console.log('📊 Sidebar cargó materias:', materiasParseadas.length);
          
          // 🆕 DEBUG DETALLADO
          console.log('🔍 DEBUG COMPLETO DE MATERIAS:');
          materiasParseadas.forEach((materia, index) => {
            console.log(`   ${index + 1}. ${materia.nombre}: nota="${materia.nota}", estado="${materia.estado}"`);
          });
          
          // Contar por estado
          const porEstado = {
            Promocionada: materiasParseadas.filter(m => m.estado === "Promocionada").length,
            A_final: materiasParseadas.filter(m => m.estado === "A final").length,
            Desaprobada: materiasParseadas.filter(m => m.estado === "Desaprobada-Recursar").length,
            Sin_estado: materiasParseadas.filter(m => !m.estado || m.estado === "").length,
            Con_nota: materiasParseadas.filter(m => m.nota && m.nota.trim() !== "").length
          };
          
          console.log('📈 RESUMEN POR ESTADO:', porEstado);
          
          setMaterias(materiasParseadas);
        } else {
          console.log('❌ NO hay datos en localStorage con clave: materias-notas');
        }
      } catch (error) {
        console.log('Error cargando materias en sidebar:', error);
      }
    };

    cargarMaterias();

    const handleStorageChange = (e) => {
      if (e.key === 'materias-notas') {
        console.log('🔄 Sidebar detectó cambio en localStorage');
        cargarMaterias();
        setUltimaActualizacion(Date.now());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      cargarMaterias();
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [ultimaActualizacion]);

  // 🎯 CÁLCULOS AUTOMÁTICOS
  const calcularEstadisticas = () => {
    const totalMaterias = materias.length;
    
    const aprobadas = materias.filter(m => m.estado === "Promocionada").length;
    const aFinal = materias.filter(m => m.estado === "A final").length;
    const desaprobadas = materias.filter(m => m.estado === "Desaprobada-Recursar").length;
    
    const pendientes = materias.filter(m => 
      !m.nota || m.nota.trim() === "" || !m.estado || m.estado === ""
    ).length;

    // 🎯 PORCENTAJE: Aprobadas + A Final
    const materiasAvanzadas = aprobadas + aFinal;
    const progreso = totalMaterias > 0 ? 
      Math.round((materiasAvanzadas / totalMaterias) * 100) : 0;

    console.log('📊 ESTADÍSTICAS CALCULADAS:', { 
      total: totalMaterias, 
      aprobadas, 
      aFinal, 
      desaprobadas,
      pendientes,
      materiasAvanzadas,
      progreso
    });

    return { totalMaterias, aprobadas, aFinal, desaprobadas, pendientes, progreso };
  };

  // 🎯 PRIORIDADES
  const obtenerPrioridades = () => {
    const pendientes = materias
      .filter(m => !m.nota || m.nota.trim() === "")
      .sort((a, b) => a.anio - b.anio)
      .slice(0, 3);
    
    return pendientes;
  };

  const estadisticas = calcularEstadisticas();
  const prioridades = obtenerPrioridades();

  const [panelAbierto, setPanelAbierto] = useState(true);

  return (
    <div className="sidebar-contenido">
      
      {/* 🆕 PANEL ACADÉMICO DINÁMICO */}
      <div className="panel-academico">
        <div className="panel-header" onClick={() => setPanelAbierto(!panelAbierto)}>
          <h3>{panelAbierto ? "▼" : "➤"} 📊 Mi Progreso Académico</h3>
          <small style={{color: '#6c757d', fontSize: '0.7rem'}}>
            Actualizado: {new Date().toLocaleTimeString()}
          </small>
        </div>
        
        {panelAbierto && (
          <div className="panel-contenido">
            {/* ESTADÍSTICAS EN CUADRADOS - DISEÑO LINDO */}
            <div className="estadisticas-grid">
              <div className="estadistica-item">
                <span className="estadistica-numero">{estadisticas.progreso}%</span>
                <span className="estadistica-label">Completado</span>
              </div>
              <div className="estadistica-item">
                <span className="estadistica-numero" style={{color: '#28a745'}}>
                  {estadisticas.aprobadas}
                </span>
                <span className="estadistica-label">Aprobadas</span>
              </div>
              <div className="estadistica-item">
                <span className="estadistica-numero" style={{color: '#ffc107'}}>
                  {estadisticas.aFinal}
                </span>
                <span className="estadistica-label">A Final</span>
              </div>
              <div className="estadistica-item">
                <span className="estadistica-numero" style={{color: '#dc3545'}}>
                  {estadisticas.desaprobadas}
                </span>
                <span className="estadistica-label">Desaprobadas</span>
              </div>
            </div>
            
            <div className="progreso-general">
              <div className="barra-progreso">
                <div 
                  className="progreso-llenado" 
                  style={{width: `${estadisticas.progreso}%`}}
                ></div>
              </div>
              <div className="progreso-texto">
                {estadisticas.aprobadas + estadisticas.aFinal} de {estadisticas.totalMaterias} materias avanzadas
              </div>
            </div>

            {/* 🎯 PRIORIDADES */}
            <div className="proximos-pasos">
              <h4>🎯 Próximas Materias</h4>
              {prioridades.map((materia, index) => (
                <div key={materia.id} className="paso-item">
                  <span className="paso-numero">{index + 1}</span>
                  <span className="paso-texto">{materia.nombre}</span>
                  <small className="paso-info">{materia.anio}º año</small>
                </div>
              ))}
              {prioridades.length === 0 && (
                <div className="sin-datos" style={{color: '#28a745'}}>¡Todas las materias tienen nota!</div>
              )}
            </div>

            {/* 🎯 MATERIAS DESAPROBADAS */}
            {estadisticas.desaprobadas > 0 && (
              <div className="materias-problema">
                <h4>⚠️ Desaprobadas</h4>
                {materias
                  .filter(m => m.estado === "Desaprobada-Recursar")
                  .slice(0, 3)
                  .map((materia) => (
                    <div key={materia.id} className="problema-item">
                      <span className="problema-texto">{materia.nombre}</span>
                      <span className="problema-nota">Nota: {materia.nota}</span>
                    </div>
                  ))}
              </div>
            )}

            {/* 🆕 DEBUG COMPLETO */}
            <div style={{ 
              background: '#e9ecef', 
              padding: '10px', 
              borderRadius: '5px', 
              marginTop: '15px',
              fontSize: '0.7rem',
              color: '#495057',
              border: '1px solid #ced4da'
            }}>
              <strong>🔍 DEBUG COMPLETO:</strong><br/>
              • Total materias: {estadisticas.totalMaterias}<br/>
              • <span style={{color: '#28a745'}}>Aprobadas: {estadisticas.aprobadas}</span><br/>
              • <span style={{color: '#ffc107'}}>A Final: {estadisticas.aFinal}</span><br/>
              • <span style={{color: '#dc3545'}}>Desaprobadas: {estadisticas.desaprobadas}</span><br/>
              • <span style={{color: '#17a2b8'}}>Pendientes: {estadisticas.pendientes}</span><br/>
              • <strong>Total avanzadas: {estadisticas.aprobadas + estadisticas.aFinal}</strong><br/>
              • <strong>Porcentaje: {estadisticas.progreso}%</strong>
            </div>

            {/* 🆕 BOTÓN PARA FORZAR ACTUALIZACIÓN */}
            <button 
              onClick={() => setUltimaActualizacion(Date.now())}
              style={{
                width: '100%',
                padding: '5px',
                marginTop: '10px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              🔄 Forzar Actualización
            </button>
          </div>
        )}
      </div>

      <NotaEducativa />
    </div>
  );
}

export default Sidebar;