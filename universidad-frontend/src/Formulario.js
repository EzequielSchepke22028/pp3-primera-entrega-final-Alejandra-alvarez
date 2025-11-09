import './Formulario.css';
// import { useNavigate } from 'react-router-dom'; <--- Eliminado: no se usa en el componente

function Formulario() {
  return (
    <div className="formulario-google">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeTSkZWlQeZZ5Bt6kLQ3STSCkyOsBN2uR8la5GNoK2Ie9zfvA/viewform?embedded=true"
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Formulario Institucional"
      >
        Cargando…
      </iframe>
    </div>
  );
}

export default Formulario;

/*import './Formulario.css';
import { useNavigate } from 'react-router-dom';

function Formulario() {
  return (
    <div className="formulario-google">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeTSkZWlQeZZ5Bt6kLQ3STSCkyOsBN2uR8la5GNoK2Ie9zfvA/viewform?embedded=true"
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Formulario Institucional"
      >
        Cargando…
      </iframe>
    </div>
  );
}

export default Formulario;*/