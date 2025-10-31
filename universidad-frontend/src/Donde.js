import './Donde.css';
import { useNavigate } from 'react-router-dom';

function Donde() {
  const navigate = useNavigate();

  return (
    <div className="IFTS-info">
      <h2>¿Dónde encontrarnos?</h2>
      <p>IFTS 9.</p>
      <p>Desde 1983, formando técnicos de nivel superior con las competencias necesarias para responder a las demandas sociales y productivas.</p>
      
      <h3>Misión:</h3>
      <p>Formar técnicos con capacidades adecuadas a las demandas sociales y productivas.</p>
      
      <h3>Visión:</h3>
      <p>Consolidarnos como la mejor oferta educativa de calidad en la zona.</p>

      <h3>Objetivos:</h3>
      <ul>
        <li>Articulación entre formación técnica y mundo laboral.</li>
        <li>Articulación con universidades.</li>
        <li>Promover la capacitación continua.</li>
      </ul>

      <div style={{margin: '20px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
        <p><strong>Mapa temporal - Funcionalidad de Google Maps en desarrollo</strong></p>
        <p>📍 IFTS 9: -34.60018734764201, -58.39140856292023</p>
        <p>📍 IFTS 12: -34.65875177209274, -58.500241289902895</p>
        <p>📍 IFTS 4: -34.6123853934262, -58.37531846106902</p>
      </div>
    </div>
  );
}

export default Donde;