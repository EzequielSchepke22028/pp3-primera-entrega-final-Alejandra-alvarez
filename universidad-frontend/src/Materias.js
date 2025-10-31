import './Materias.css';

function Materias() {
  // Simulación de materias del alumno (pueden venir de un backend en el futuro)
  const materias = [
    { nombre: 'Matemática', profesor: 'Prof. López', horario: 'Lunes y Miércoles 10:00 - 11:30' },
    { nombre: 'Historia', profesor: 'Prof. García', horario: 'Martes 9:00 - 11:00' },
    { nombre: 'Lengua', profesor: 'Prof. Pérez', horario: 'Jueves 14:00 - 15:30' },
  ];

  return (
    <div className="materias-container">
      <h1>Mis Materias</h1>
      <div className="materias-grid">
        {materias.map((materia, index) => (
          <div className="materia-card" key={index}>
            <h2>{materia.nombre}</h2>
            <p><strong>Profesor:</strong> {materia.profesor}</p>
            <p><strong>Horario:</strong> {materia.horario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materias;
