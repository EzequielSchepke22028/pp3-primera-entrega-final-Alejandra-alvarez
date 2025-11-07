import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [modoNocturno, setModoNocturno] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleModoNocturno = () => {
    setModoNocturno(!modoNocturno);
    document.body.classList.toggle('modo-nocturno');
  };

  const cerrarSesion = () => {
    if (window.confirm('¿Estás seguro de que querés cerrar sesión?')) {
      console.log('Sesión cerrada');
      // Aquí iría la lógica real de cerrar sesión
    }
  };

  return (
    <div className="header">
      {/* Logo y título */}
      <div className="header-left">
        <h2>🎓 Mi Universidad</h2>
      </div>

      {/* Opciones de usuario */}
      <div className="header-right">
        {/* Modo nocturno */}
        <button 
          className="header-btn"
          onClick={toggleModoNocturno}
          title={modoNocturno ? 'Modo diurno' : 'Modo nocturno'}
        >
          {modoNocturno ? '☀️' : '🌙'}
        </button>

        {/* Notificaciones */}
        <button className="header-btn" title="Notificaciones">
          🔔
        </button>

        {/* Menú de perfil */}
        <div className="perfil-menu">
          <button 
            className="perfil-btn"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            👤 Mi Perfil ▼
          </button>
          
          {menuAbierto && (
            <div className="menu-desplegable">
              <div className="menu-item">👤 Ver Perfil</div>
              <div className="menu-item">⚙️ Configuración</div>
              <div className="menu-item">💾 Guardar Progreso</div>
              <div className="menu-item">📊 Estadísticas</div>
              <div className="menu-item" onClick={cerrarSesion}>🚪 Cerrar Sesión</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;