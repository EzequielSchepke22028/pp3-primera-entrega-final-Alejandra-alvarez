import React from "react";
import Sidebar from "./componentes/Sidebar";
import NotaEducativa from "./componentes/NotaEducativa";
import TablaDeNotas from "./TablaDeNotas";
import CalendarioWidget from "./componentes/CalendarioWidget";
import "./OpcionesAElegir.css";

export default function OpcionesAElegir() {
  return (
    <div className="educativa-layout">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="contenido">
        <TablaDeNotas />
      </main>

      <CalendarioWidget />
    </div>
  );
}