import React from 'react';
import Sidebar from './componentes/Sidebar';
import './LayoutNotas.css';

function LayoutNotas({ children, materias }) {
  return (
    <div className="layout-notas-container">
      <aside className="sidebar-layout">
        <Sidebar materias={materias} />
      </aside>
      <main className="main-content-layout">
        {children}
      </main>
    </div>
  );
}

export default LayoutNotas;