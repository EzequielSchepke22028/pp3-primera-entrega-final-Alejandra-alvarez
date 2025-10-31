import './SobreIFTS.css';
import { useNavigate } from 'react-router-dom';

function SobreIFTS() {
  const navigate = useNavigate();

  return (
    <div className="IFTS-info">
      <h2>¿Quiénes somos?</h2>
      <p>
        Somos un Instituto de Educación Técnica Superior dependiente del Ministerio de Educación de la Ciudad Autónoma de Buenos Aires.
      </p>

      <p>
        Nuestra misión es desarrollar procesos formativos de calidad e inclusivos, destinados a una población joven y adulta, mediante los que se gradúen técnicos/as y profesionales de nivel superior que cuenten con las capacidades y saberes necesarios para responder a las demandas sociales, laborales y productivas, para contribuir en el desarrollo sostenido de la Ciudad.
      </p>

      <h2>¿Cual es nuestro objetivo?</h2>
      <ul>
        <li>Formar técnicos/as superiores capacitados/as para actuar profesionalmente y con responsabilidad social, para contribuir a la construcción y desarrollo de una sociedad más justa, solidaria y equitativa.</li>
        <li>Contribuir al desarrollo y fortalecimiento de la calidad de la formación técnica y al desarrollo social, cultural y económico.</li>
        <li>Impulsar acciones de cooperación, articulación e intercambio con otras instituciones de educación superior (convenios universitarios).</li>
        <li>Difundir y consolidar los avances en la construcción de saberes a través del desarrollo de acciones de extensión orientadas a la aplicación de innovaciones en distintos espacios educativos, sociales y productivos.</li>        
        <li>Impulsar y desarrollar acciones de cooperación e investigación, articulación e intercambio con la comunidad.</li>
        <li>Nuestros docentes son excelentes profesionales y técnicos, apasionados por la tarea y comprometidos con la institución y sus estudiantes.</li>
        <li>Contamos con nuestro propio campus, con un gran equipamiento tecnológico y con instalaciones óptimas que nos permiten desarrollar nuestras funciones con un alto grado de eficiencia.</li>
      </ul>

      <h2>¿Por qué elegirnos?</h2>
      <ul>
        <li>Educación de calidad y no arancelada.</li>
        <li>Reconocimiento de lo estudiado para quienes hayan finalizado cursos de Formación Profesional o realizado sus estudios en escuelas técnicas.</li>
        <li>Modalidad híbrida, cursadas virtuales y presenciales.</li>
        <li>Título con validez nacional.</li>
        <li>Títulos en poco tiempo (entre 2 y 3 años).</li>
      </ul>
    </div>
  );
}

export default SobreIFTS;