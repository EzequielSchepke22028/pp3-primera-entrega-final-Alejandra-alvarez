import React, { useState } from 'react';

const materias = [
{
nombre: 'Matemática I',
carrera: 'Ingeniería',
año: 1,
modalidad: 'Presencial',
imagen: 'https://i.imgur.com/imagenIngenieria.png',
descripcion: 'Área de formación técnica en ingeniería aplicada.'
},
{
nombre: 'Historia',
carrera: 'Humanidades',
año: 2,
modalidad: 'Virtual',
imagen: 'https://i.imgur.com/imagenHumanidades.png',
descripcion: 'Área de estudios sociales y culturales.'
}
];

const OfertaAcademica = () => {
const [filtroCarrera, setFiltroCarrera] = useState('');
const [filtroAño, setFiltroAño] = useState('');
const [filtroModalidad, setFiltroModalidad] = useState('');

const materiasFiltradas = materias.filter(m => {
return (
(filtroCarrera === '' || m.carrera === filtroCarrera) &&
(filtroAño === '' || m.año === parseInt(filtroAño)) &&
(filtroModalidad === '' || m.modalidad === filtroModalidad)
);
});

return (
<div>
<h2>Oferta Académica</h2>

<label>Carrera:</label>
<select value={filtroCarrera} onChange={e => setFiltroCarrera(e.target.value)}>
<option value="">Todas las áreas</option>
<option value="Ingeniería">Ingeniería</option>
<option value="Humanidades">Humanidades</option>
</select>

<label>Modalidad:</label>
<select value={filtroModalidad} onChange={e => setFiltroModalidad(e.target.value)}>
<option value="">Todas las modalidades</option>
<option value="Presencial">Presencial</option>
<option value="Virtual">Virtual</option>
</select>

<label>Nivel:</label>
<select value={filtroAño} onChange={e => setFiltroAño(e.target.value)}>
<option value="">Todos los niveles</option>
<option value="1">Nivel 1</option>
<option value="2">Nivel 2</option>
</select>

{filtroCarrera && materiasFiltradas.length > 0 && (
<div style={{ marginTop: '20px' }}>
<img src={materiasFiltradas[0].imagen} alt="Imagen del área" style={{ width: '300px' }} />
<p>{materiasFiltradas[0].descripcion}</p>
</div>
)}

<ul>
{materiasFiltradas.map((m, i) => (
<li key={i}>
{m.nombre} - {m.carrera} - Año {m.año} - {m.modalidad}
</li>
))}
</ul>
</div>
);
};

export default OfertaAcademica;
