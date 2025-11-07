import React from 'react';
import './Convenio.css'; // si tenés estilos

function Convenio() {
  return (
    <div className="convenio-wrapper">
      <h1>Convenios Institucionales</h1>
      <p>Si sos egresado o estás por egresar de una tecnicatura superior ¡Este programa es para vos! Con Licenciate BA tu título de licenciado está más cerca.</p>
      <p>Las universidades públicas y privadas reconocen las materias que aprobaste en tu tecnicatura. Con Licenciate BA avanzás más rápido hacia tu título universitario.</p>
      <h2>Universidades que forman parte del programa</h2>
      <ul>
          <li>Universidad Tecnológica Nacional (UTN)</li>
          <li>Universidad Nacional de Lomas de Zamora (UNLZ)</li>
          <li>Universidad Siglo 21 </li>
          <li>Universidad de San Martín (UNSAM) </li>
          <li>Universidad Evangélica (UE) </li>
          <li>Universidad de Flores (UFLO Universidad)  </li>
          <li>Universidad de la Marina Mercante (UdeMM) </li>
          <li>Universidad de Ciencias Empresariales y Sociales (UCES) </li>
          <li>Universidad Metropolitana para la Educación y el Trabajo (UMET)  </li>
          <li>Universidad del Museo Social Argentino (UMSA) </li>
          <li>Universidad Abierta Interamericana (UAI)  </li>
          <li>Universidad del Salvador (USAL) </li>
      </ul>
        <h3>Más información en:</h3>
        <a href="https://buenosaires.gob.ar/educacion/licenciate-ba">LicenciateBA</a>
      {/* Podés agregar logos, enlaces o tarjetas aquí */}
    </div>
  );
}

export default Convenio;
