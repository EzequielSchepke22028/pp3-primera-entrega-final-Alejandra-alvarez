import React, { useState } from "react";
import NotaEducativa from "./NotaEducativa"; // Importá el bloc
import "./Sidebar.css";

function Sidebar() {
  const [materiasAbierto, setMateriasAbierto] = useState(false);
  const [carpetasAbierto, setCarpetasAbierto] = useState(false);
  const [carpetasAbiertoo, setCarpetasAbiertoo] = useState(false);
  const [carpetasAbiertooo, setCarpetasAbiertooo] = useState(false);
  const [eventosAbierto, setEventosAbierto] = useState(false);

  return (
    <div className="sidebar-contenido">
      <ul>
        <li onClick={() => setMateriasAbierto(!materiasAbierto)}>
            {materiasAbierto ? "▼" : "➤"} Mis Materias en curso: 📚

        </li>
        {materiasAbierto && (
          <ul className="submenu"> 
            <li>Programacion I</li>
            <li>Ingles Tecnico</li>
            <li>Base de Datos</li>
          </ul>
        )}

        <li onClick={() => setCarpetasAbierto(!carpetasAbierto)}>
          {carpetasAbierto ? "▼" : "➤"} Ejercicios 🗂️

        </li>
        {carpetasAbierto && (
          <ul className="submenu">
            <li>Programacion I</li>
            <li>Ingles Tecnico</li>
            <li>Base de Datos</li>
          </ul>
        )}

         <li onClick={() => setCarpetasAbiertoo(!carpetasAbiertoo)}>
          {carpetasAbiertoo ? "▼" : "➤"} Apuntes 🗂️

        </li>
        {carpetasAbiertoo && (
          <ul className="submenu">
            <li>Programacion I</li>
            <li>Ingles Tecnico</li>
            <li>Base de Datos</li>
          </ul>
        )}


         <li onClick={() => setCarpetasAbiertooo(!carpetasAbiertooo)}>
          {carpetasAbiertooo ? "▼" : "➤"} Notas de Exámenes 🗂️

        </li>
        {carpetasAbiertooo && (
          <ul className="submenu">
            <li>Programacion I</li>
            <li>Apuntes</li>
            <li>Exámenes</li>
          </ul>
        )}

        <li onClick={() => setEventosAbierto(!eventosAbierto)}>
          {eventosAbierto ? "▼" : "➤"} Próximos eventos 📅
        </li>
        {eventosAbierto && (
          <ul className="submenu5">
            <li>Entrega de TP</li>
            <li>Clase especial</li>
            <li>Examen parcial</li>
          </ul>
        )}
      </ul>

      <NotaEducativa /> {/* Bloc de notas integrado directamente */}
    </div>
  );
}

export default Sidebar;