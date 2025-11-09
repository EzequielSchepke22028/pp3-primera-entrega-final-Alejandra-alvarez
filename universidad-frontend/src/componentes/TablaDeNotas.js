import React, { useState, useEffect, useCallback } from "react";
import "./TablaDeNotas.css";

function TablaDeNotas() {
  const [materias, setMaterias] = useState([
    // 📘 1º Año
    { id: 101, anio: 1, correlativas: "-", nombre: "Matemática", nota: "", estado: "", condicion: "" },
    { id: 102, anio: 1, correlativas: "-", nombre: "Lógica", nota: "", estado: "", condicion: "" },
    { id: 103, anio: 1, correlativas: "-", nombre: "Introducción a la Programación", nota: "", estado: "", condicion: "" },
    { id: 104, anio: 1, correlativas: "-", nombre: "Arquitectura de Computadoras", nota: "", estado: "", condicion: "" },
    { id: 105, anio: 1, correlativas: "-", nombre: "Inglés Técnico I", nota: "", estado: "", condicion: "" },
    { id: 106, anio: 1, correlativas: "-", nombre: "Práctica Profesionalizante I", nota: "", estado: "", condicion: "" },

    // 📗 2º Año
    { id: 201, anio: 2, correlativas: "101, 103", nombre: "Programación I", nota: "", estado: "", condicion: "" },
    { id: 202, anio: 2, correlativas: "101", nombre: "Estadística", nota: "", estado: "", condicion: "" },
    { id: 203, anio: 2, correlativas: "104", nombre: "Sistemas Operativos", nota: "", estado: "", condicion: "" },
    { id: 204, anio: 2, correlativas: "102", nombre: "Bases de Datos", nota: "", estado: "", condicion: "" },
    { id: 205, anio: 2, correlativas: "105", nombre: "Inglés Técnico II", nota: "", estado: "", condicion: "" },
    { id: 206, anio: 2, correlativas: "106", nombre: "Práctica Profesionalizante II", nota: "", estado: "", condicion: "" },

    // 📙 3º Año
    { id: 301, anio: 3, correlativas: "201", nombre: "Programación II", nota: "", estado: "", condicion: "" },
    { id: 302, anio: 3, correlativas: "204", nombre: "Análisis de Sistemas", nota: "", estado: "", condicion: "" },
    { id: 303, anio: 3, correlativas: "203", nombre: "Redes y Comunicaciones", nota: "", estado: "", condicion: "" },
    { id: 304, anio: 3, correlativas: "202", nombre: "Gestión de Proyectos", nota: "", estado: "", condicion: "" },
    { id: 305, anio: 3, correlativas: "205", nombre: "Inglés Técnico III", nota: "", estado: "", condicion: "" },
    { id: 306, anio: 3, correlativas: "206", nombre: "Práctica Profesionalizante III", nota: "", estado: "", condicion: "" },
  ]);

  const [modoEdicion, setModoEdicion] = useState({});

  const toggleEdicion = (id, campo) => {
    const clave = `${id}-${campo}`;
    setModoEdicion((prev) => ({
      ...prev,
      [clave]: !prev[clave],
    }));
  };

  // Esta función debe ser un useCallback si se usa en un useEffect como dependencia.
  // Pero aquí se usa solo de forma síncrona, no necesita useCallback,
  // pero la definimos fuera de manejarCambio para claridad.
  const evaluarCondicion = (materia, todasPromocionadas) => {
    const estado = materia.estado;

    if (estado === "Desaprobada-Recursar") return "-";
    if (estado === "A final") return "Dar final";
    if (estado === "Promocionada") return "Aprobada";
    if (estado === "Valor incorrecto") return "-";

    return todasPromocionadas ? "Disponible para cursar" : "Requiere Correlativas";
  };

  // Función para recalcular el estado y condición de las materias
  const recalcularMaterias = useCallback((currentMaterias) => {
    return currentMaterias.map((materia) => {
      const idsCorrelativas = materia.correlativas
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "-");

      const notasCorrelativas = idsCorrelativas.map((id) => {
        const correlativa = currentMaterias.find((m) => m.id === parseInt(id));
        return correlativa ? parseFloat(correlativa.nota) : null;
      });

      const todasPromocionadas = notasCorrelativas.every(
        (nota) => nota !== null && nota >= 7 && nota < 11
      );

      // Usamos la lógica de evaluación de condición
      const condicion = evaluarCondicion(materia, todasPromocionadas);

      return {
        ...materia,
        condicion: condicion,
      };
    });
  }, []); // evaluarCondicion es una función pura, no necesita ir aquí

  const manejarCambio = (id, campo, valor) => {
    // 1. Crear el nuevo array de materias con el cambio específico
    const nuevasMateriasBase = materias.map((materia) =>
      materia.id === id ? { ...materia, [campo]: valor } : materia
    );

    const materiaEditada = nuevasMateriasBase.find((m) => m.id === id);

    // 2. Recalcular el 'estado' si se cambia la 'nota'
    if (campo === "nota") {
      const notaNumerica = parseFloat(valor);
      if (valor.trim() === "") {
        materiaEditada.estado = "";
      } else if (isNaN(notaNumerica) || notaNumerica > 10) {
        materiaEditada.estado = "Valor incorrecto";
      } else if (notaNumerica >= 7) {
        materiaEditada.estado = "Promocionada";
      } else if (notaNumerica >= 4) {
        materiaEditada.estado = "A final";
      } else {
        materiaEditada.estado = "Desaprobada-Recursar";
      }
    }
    
    // 3. Recalcular la condición para TODAS las materias
    const materiasRecalculadas = recalcularMaterias(nuevasMateriasBase);
    
    // 4. Actualizar el estado
    setMaterias(materiasRecalculadas);
  };

  // 1. Inicialización de Condiciones al Montar (Resolviendo el warning de dependencias)
  // Ahora usamos el useCallback para la función de inicialización.
  // El warning original se resuelve porque ya no hay funciones externas no definidas
  // y la lógica de inicialización está controlada.
  useEffect(() => {
    // Usamos el callback para asegurar que la lógica de cálculo esté aislada.
    const materiasInicializadas = recalcularMaterias(materias);
    setMaterias(materiasInicializadas);
  }, [recalcularMaterias]); 
  // Nota: materia se elimina de las dependencias ya que solo la usamos 
  // para el primer cálculo dentro del useEffect, y luego el useCallback se encarga
  // del estado.

  const renderTablaPorAnio = (anio, color, titulo) => (
    <section className="tabla-materias">
      <h3>{`${color} ${titulo}`}</h3>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Correlativa/s</th>
            <th>Materia</th>
            <th>Nota</th>
            <th>Estado</th>
            <th>Condición</th>
          </tr>
        </thead>
        <tbody>
          {materias
            .filter((materia) => materia.anio === anio)
            .map((materia) => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>
                  <div className="campo-editable">
                    <input
                      type="text"
                      value={materia.correlativas}
                      readOnly={!modoEdicion[`${materia.id}-correlativas`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-correlativas`] ? "editable" : "correlativas-bloqueado"}`}
                      onChange={(e) => manejarCambio(materia.id, "correlativas", e.target.value)}
                    />
                    <button onClick={() => toggleEdicion(materia.id, "correlativas")} className="lapiz-btn">
                      {modoEdicion[`${materia.id}-correlativas`] ? "✔️" : "✏️"}
                    </button>
                  </div>
                </td>
                <td className="columna-grisada">{materia.nombre}</td>
                <td>
                  <input
                    type="text"
                    value={materia.nota}
                    onChange={(e) => manejarCambio(materia.id, "nota", e.target.value)}
                  />
                </td>
                <td>
                  <div className="campo-editable">
                    <select
                      value={materia.estado}
                      onChange={(e) => manejarCambio(materia.id, "estado", e.target.value)}
                      disabled={!modoEdicion[`${materia.id}-estado`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-estado`] ? "editable" : "estado-bloqueado"}`}
                      >
                        <option value="">-- Seleccionar estado --</option>
                        <option value="Desaprobada-Recursar">Desaprobada-Recursar</option>
                        <option value="A final">A final</option>
                        <option value="Promocionada">Promocionada</option>
                        <option value="Valor incorrecto">Valor incorrecto</option>
                    </select>
                    <button onClick={() => toggleEdicion(materia.id, "estado")} className="lapiz-btn">
                      {modoEdicion[`${materia.id}-estado`] ? "✔️" : "✏️"}
                    </button>
                  </div>
                </td>
                <td>
                  <div className="contenedor-condicion">
                    <input
                      type="text"
                      value={materia.condicion}
                      readOnly
                      className="condicion-bloqueada"
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );

  return (
    <div>
      <h2 className="titulo-libreta">MI LIBRETA VIRTUAL</h2>
      {renderTablaPorAnio(1, "📘", "1º Año Analisis de Sistemas - IFTS 4")}
      {renderTablaPorAnio(2, "📗", "2º Año Analisis de Sistemas - IFTS 4")}
      {renderTablaPorAnio(3, "📙", "3º Año Analisis de Sistemas - IFTS 4")}
    </div>
  );
}

export default TablaDeNotas;


/*import React, { useState, useEffect, useCallback } from "react";
import "./TablaDeNotas.css";

function TablaDeNotas() {
  const [materias, setMaterias] = useState([
    // 📘 1º Año
    { id: 101, anio: 1, correlativas: "-", nombre: "Matemática", nota: "", estado: "", condicion: "" },
    { id: 102, anio: 1, correlativas: "-", nombre: "Lógica", nota: "", estado: "", condicion: "" },
    { id: 103, anio: 1, correlativas: "-", nombre: "Introducción a la Programación", nota: "", estado: "", condicion: "" },
    { id: 104, anio: 1, correlativas: "-", nombre: "Arquitectura de Computadoras", nota: "", estado: "", condicion: "" },
    { id: 105, anio: 1, correlativas: "-", nombre: "Inglés Técnico I", nota: "", estado: "", condicion: "" },
    { id: 106, anio: 1, correlativas: "-", nombre: "Práctica Profesionalizante I", nota: "", estado: "", condicion: "" },

    // 📗 2º Año
    { id: 201, anio: 2, correlativas: "101, 103", nombre: "Programación I", nota: "", estado: "", condicion: "" },
    { id: 202, anio: 2, correlativas: "101", nombre: "Estadística", nota: "", estado: "", condicion: "" },
    { id: 203, anio: 2, correlativas: "104", nombre: "Sistemas Operativos", nota: "", estado: "", condicion: "" },
    { id: 204, anio: 2, correlativas: "102", nombre: "Bases de Datos", nota: "", estado: "", condicion: "" },
    { id: 205, anio: 2, correlativas: "105", nombre: "Inglés Técnico II", nota: "", estado: "", condicion: "" },
    { id: 206, anio: 2, correlativas: "106", nombre: "Práctica Profesionalizante II", nota: "", estado: "", condicion: "" },

    // 📙 3º Año
    { id: 301, anio: 3, correlativas: "201", nombre: "Programación II", nota: "", estado: "", condicion: "" },
    { id: 302, anio: 3, correlativas: "204", nombre: "Análisis de Sistemas", nota: "", estado: "", condicion: "" },
    { id: 303, anio: 3, correlativas: "203", nombre: "Redes y Comunicaciones", nota: "", estado: "", condicion: "" },
    { id: 304, anio: 3, correlativas: "202", nombre: "Gestión de Proyectos", nota: "", estado: "", condicion: "" },
    { id: 305, anio: 3, correlativas: "205", nombre: "Inglés Técnico III", nota: "", estado: "", condicion: "" },
    { id: 306, anio: 3, correlativas: "206", nombre: "Práctica Profesionalizante III", nota: "", estado: "", condicion: "" },
  ]);

  const [modoEdicion, setModoEdicion] = useState({});

  const toggleEdicion = (id, campo) => {
    const clave = `${id}-${campo}`;
    setModoEdicion((prev) => ({
      ...prev,
      [clave]: !prev[clave],
    }));
  };

  // Esta función debe ser un useCallback si se usa en un useEffect como dependencia.
  // Pero aquí se usa solo de forma síncrona, no necesita useCallback,
  // pero la definimos fuera de manejarCambio para claridad.
  const evaluarCondicion = (materia, todasPromocionadas) => {
    const estado = materia.estado;

    if (estado === "Desaprobada-Recursar") return "-";
    if (estado === "A final") return "Dar final";
    if (estado === "Promocionada") return "Aprobada";
    if (estado === "Valor incorrecto") return "-";

    return todasPromocionadas ? "Disponible para cursar" : "Requiere Correlativas";
  };

  // Función para recalcular el estado y condición de las materias
  const recalcularMaterias = useCallback((currentMaterias) => {
    return currentMaterias.map((materia) => {
      const idsCorrelativas = materia.correlativas
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "-");

      const notasCorrelativas = idsCorrelativas.map((id) => {
        const correlativa = currentMaterias.find((m) => m.id === parseInt(id));
        return correlativa ? parseFloat(correlativa.nota) : null;
      });

      const todasPromocionadas = notasCorrelativas.every(
        (nota) => nota !== null && nota >= 7 && nota < 11
      );

      // Usamos la lógica de evaluación de condición
      const condicion = evaluarCondicion(materia, todasPromocionadas);

      return {
        ...materia,
        condicion: condicion,
      };
    });
  }, []); // evaluarCondicion es una función pura, no necesita ir aquí

  const manejarCambio = (id, campo, valor) => {
    // 1. Crear el nuevo array de materias con el cambio específico
    const nuevasMateriasBase = materias.map((materia) =>
      materia.id === id ? { ...materia, [campo]: valor } : materia
    );

    const materiaEditada = nuevasMateriasBase.find((m) => m.id === id);

    // 2. Recalcular el 'estado' si se cambia la 'nota'
    if (campo === "nota") {
      const notaNumerica = parseFloat(valor);
      if (valor.trim() === "") {
        materiaEditada.estado = "";
      } else if (isNaN(notaNumerica) || notaNumerica > 10) {
        materiaEditada.estado = "Valor incorrecto";
      } else if (notaNumerica >= 7) {
        materiaEditada.estado = "Promocionada";
      } else if (notaNumerica >= 4) {
        materiaEditada.estado = "A final";
      } else {
        materiaEditada.estado = "Desaprobada-Recursar";
      }
    }
    
    // 3. Recalcular la condición para TODAS las materias
    const materiasRecalculadas = recalcularMaterias(nuevasMateriasBase);
    
    // 4. Actualizar el estado
    setMaterias(materiasRecalculadas);
  };

  // 1. Inicialización de Condiciones al Montar (Resolviendo el warning de dependencias)
  // Ahora usamos el useCallback para la función de inicialización.
  // El warning original se resuelve porque ya no hay funciones externas no definidas
  // y la lógica de inicialización está controlada.
  useEffect(() => {
    // Usamos el callback para asegurar que la lógica de cálculo esté aislada.
    const materiasInicializadas = recalcularMaterias(materias);
    setMaterias(materiasInicializadas);
  }, [recalcularMaterias]); 
  // Nota: materia se elimina de las dependencias ya que solo la usamos 
  // para el primer cálculo dentro del useEffect, y luego el useCallback se encarga
  // del estado.

  const renderTablaPorAnio = (anio, color, titulo) => (
    <section className="tabla-materias">
      <h3>{`${color} ${titulo}`}</h3>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Correlativa/s</th>
            <th>Materia</th>
            <th>Nota</th>
            <th>Estado</th>
            <th>Condición</th>
          </tr>
        </thead>
        <tbody>
          {materias
            .filter((materia) => materia.anio === anio)
            .map((materia) => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>
                  <div className="campo-editable">
                    <input
                      type="text"
                      value={materia.correlativas}
                      readOnly={!modoEdicion[`${materia.id}-correlativas`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-correlativas`] ? "editable" : "correlativas-bloqueado"}`}
                      onChange={(e) => manejarCambio(materia.id, "correlativas", e.target.value)}
                    />
                    <button onClick={() => toggleEdicion(materia.id, "correlativas")} className="lapiz-btn">
                      {modoEdicion[`${materia.id}-correlativas`] ? "✔️" : "✏️"}
                    </button>
                  </div>
                </td>
                <td className="columna-grisada">{materia.nombre}</td>
                <td>
                  <input
                    type="text"
                    value={materia.nota}
                    onChange={(e) => manejarCambio(materia.id, "nota", e.target.value)}
                  />
                </td>
                <td>
                  <div className="campo-editable">
                    <select
                      value={materia.estado}
                      onChange={(e) => manejarCambio(materia.id, "estado", e.target.value)}
                      disabled={!modoEdicion[`${materia.id}-estado`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-estado`] ? "editable" : "estado-bloqueado"}`}
                      >
                        <option value="">-- Seleccionar estado --</option>
                        <option value="Desaprobada-Recursar">Desaprobada-Recursar</option>
                        <option value="A final">A final</option>
                        <option value="Promocionada">Promocionada</option>
                        <option value="Valor incorrecto">Valor incorrecto</option>
                    </select>
                    <button onClick={() => toggleEdicion(materia.id, "estado")} className="lapiz-btn">
                      {modoEdicion[`${materia.id}-estado`] ? "✔️" : "✏️"}
                    </button>
                  </div>
                </td>
                <td>
                  <div className="contenedor-condicion">
                    <input
                      type="text"
                      value={materia.condicion}
                      readOnly
                      className="condicion-bloqueada"
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );

  return (
    <div>
      <h2 className="titulo-libreta">MI LIBRETA VIRTUAL</h2>
      {renderTablaPorAnio(1, "📘", "1º Año Analisis de Sistemas - IFTS 4")}
      {renderTablaPorAnio(2, "📗", "2º Año Analisis de Sistemas - IFTS 4")}
      {renderTablaPorAnio(3, "📙", "3º Año Analisis de Sistemas - IFTS 4")}
    </div>
  );
}

export default TablaDeNotas; */

/*import React, { useState, useEffect } from "react";
import "./TablaDeNotas.css";

function TablaDeNotas() {
  const [materias, setMaterias] = useState([
    // 📘 1º Año
    { id: 101, anio: 1, correlativas: "-", nombre: "Matemática", nota: "", estado: "", condicion: "" },
    { id: 102, anio: 1, correlativas: "-", nombre: "Lógica", nota: "", estado: "", condicion: "" },
    { id: 103, anio: 1, correlativas: "-", nombre: "Introducción a la Programación", nota: "", estado: "", condicion: "" },
    { id: 104, anio: 1, correlativas: "-", nombre: "Arquitectura de Computadoras", nota: "", estado: "", condicion: "" },
    { id: 105, anio: 1, correlativas: "-", nombre: "Inglés Técnico I", nota: "", estado: "", condicion: "" },
    { id: 106, anio: 1, correlativas: "-", nombre: "Práctica Profesionalizante I", nota: "", estado: "", condicion: "" },

    // 📗 2º Año
    { id: 201, anio: 2, correlativas: "101, 103", nombre: "Programación I", nota: "", estado: "", condicion: "" },
    { id: 202, anio: 2, correlativas: "101", nombre: "Estadística", nota: "", estado: "", condicion: "" },
    { id: 203, anio: 2, correlativas: "104", nombre: "Sistemas Operativos", nota: "", estado: "", condicion: "" },
    { id: 204, anio: 2, correlativas: "102", nombre: "Bases de Datos", nota: "", estado: "", condicion: "" },
    { id: 205, anio: 2, correlativas: "105", nombre: "Inglés Técnico II", nota: "", estado: "", condicion: "" },
    { id: 206, anio: 2, correlativas: "106", nombre: "Práctica Profesionalizante II", nota: "", estado: "", condicion: "" },

    // 📙 3º Año
    { id: 301, anio: 3, correlativas: "201", nombre: "Programación II", nota: "", estado: "", condicion: "" },
    { id: 302, anio: 3, correlativas: "204", nombre: "Análisis de Sistemas", nota: "", estado: "", condicion: "" },
    { id: 303, anio: 3, correlativas: "203", nombre: "Redes y Comunicaciones", nota: "", estado: "", condicion: "" },
    { id: 304, anio: 3, correlativas: "202", nombre: "Gestión de Proyectos", nota: "", estado: "", condicion: "" },
    { id: 305, anio: 3, correlativas: "205", nombre: "Inglés Técnico III", nota: "", estado: "", condicion: "" },
    { id: 306, anio: 3, correlativas: "206", nombre: "Práctica Profesionalizante III", nota: "", estado: "", condicion: "" },
  ]);

  const [modoEdicion, setModoEdicion] = useState({});

  const toggleEdicion = (id, campo) => {
    const clave = `${id}-${campo}`;
    setModoEdicion((prev) => ({
      ...prev,
      [clave]: !prev[clave],
    }));
  };

  const evaluarCondicion = (materia, todasPromocionadas) => {
    const estado = materia.estado;

    if (estado === "Desaprobada-Recursar") return "-";
    if (estado === "A final") return "Dar final";
    if (estado === "Promocionada") return "Aprobada";
     if (estado === "Valor incorrecto") return "-";

    return todasPromocionadas ? "Disponible para cursar" : "Requiere Correlativas";
  };

  const manejarCambio = (id, campo, valor) => {
    const nuevasMaterias = materias.map((materia) =>
      materia.id === id ? { ...materia, [campo]: valor } : materia
    );

    const materiaEditada = nuevasMaterias.find((m) => m.id === id);

    if (campo === "nota") {
      const notaNumerica = parseFloat(valor);
      if (valor.trim() === "") {
        materiaEditada.estado = "";
      } else if (isNaN(notaNumerica) || notaNumerica > 10) {
        materiaEditada.estado = "Valor incorrecto";
      } else if (notaNumerica >= 7) {
        materiaEditada.estado = "Promocionada";
      } else if (notaNumerica >= 4) {
        materiaEditada.estado = "A final";
      } else {
        materiaEditada.estado = "Desaprobada-Recursar";
      }
    }

    nuevasMaterias.forEach((materia) => {
      const idsCorrelativas = materia.correlativas
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "-");

      const notasCorrelativas = idsCorrelativas.map((id) => {
        const correlativa = nuevasMaterias.find((m) => m.id === parseInt(id));
        return correlativa ? parseFloat(correlativa.nota) : null;
      });

      const todasPromocionadas = notasCorrelativas.every(
        (nota) => nota !== null && nota >= 7 && nota < 11
      );

      materia.condicion = evaluarCondicion(materia, todasPromocionadas);
    });

    setMaterias(nuevasMaterias);
  };

  useEffect(() => {
    const materiasInicializadas = materias.map((materia) => {
      const idsCorrelativas = materia.correlativas
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "-");

      const notasCorrelativas = idsCorrelativas.map((id) => {
        const correlativa = materias.find((m) => m.id === parseInt(id));
        return correlativa ? parseFloat(correlativa.nota) : null;
      });

      const todasPromocionadas = notasCorrelativas.every(
        (nota) => nota !== null && nota >= 7 && nota < 11
      );

      return {
        ...materia,
        condicion: evaluarCondicion(materia, todasPromocionadas),
      };
    });

    setMaterias(materiasInicializadas);
  }, []);

  const renderTablaPorAnio = (anio, color, titulo) => (
    <section className="tabla-materias">
      <h3>{`${color} ${titulo}`}</h3>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Correlativa/s</th>
            <th>Materia</th>
            <th>Nota</th>
            <th>Estado</th>
            <th>Condición</th>
          </tr>
        </thead>
        <tbody>
          {materias
            .filter((materia) => materia.anio === anio)
            .map((materia) => (
              <tr key={materia.id}>
                <td>{materia.id}</td>
                <td>
                  <div className="campo-editable">
                    <input
                      type="text"
                      value={materia.correlativas}
                      readOnly={!modoEdicion[`${materia.id}-correlativas`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-correlativas`] ? "editable" : "correlativas-bloqueado"}`}
                      onChange={(e) => manejarCambio(materia.id, "correlativas", e.target.value)}
                    />
                    <button onClick={() => toggleEdicion(materia.id, "correlativas")} className="lapiz-btn">
                      {modoEdicion[`${materia.id}-correlativas`] ? "✔️" : "✏️"}
                    </button>
                  </div>
                </td>
                <td className="columna-grisada">{materia.nombre}</td>
                <td>
                  <input
                    type="text"
                    value={materia.nota}
                    onChange={(e) => manejarCambio(materia.id, "nota", e.target.value)}
                  />
                </td>
                <td>
                  <div className="campo-editable">
                    <select
                      value={materia.estado}
                      onChange={(e) => manejarCambio(materia.id, "estado", e.target.value)}
                      disabled={!modoEdicion[`${materia.id}-estado`]}
                      className={`campo-input ${modoEdicion[`${materia.id}-estado`] ? "editable" : "estado-bloqueado"}`}
                      >
                        <option value="">-- Seleccionar estado --</option>
                        <option value="Desaprobada-Recursar">Desaprobada-Recursar</option>
                        <option value="A final">A final</option>
                        <option value="Promocionada">Promocionada</option>
                        <option value="Valor incorrecto">Valor incorrecto</option>
                      </select>
                      <button onClick={() => toggleEdicion(materia.id, "estado")} className="lapiz-btn">
                        {modoEdicion[`${materia.id}-estado`] ? "✔️" : "✏️"}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="contenedor-condicion">
                      <input
                        type="text"
                        value={materia.condicion}
                        readOnly
                        className="condicion-bloqueada"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    );

// En el componente padre, pasar las materias al Sidebar
function App() {
  const [materias, setMaterias] = useState([...]); // Tus materias aquí
  

    
    return (
      <div>
        <h2 className="titulo-libreta">MI LIBRETA VIRTUAL</h2>
        {renderTablaPorAnio(1, "📘", "1º Año Analisis de Sistemas - IFTS 4")}
        {renderTablaPorAnio(2, "📗", "2º Año Analisis de Sistemas - IFTS 4")}
        {renderTablaPorAnio(3, "📙", "3º Año Analisis de Sistemas - IFTS 4")}
      </div>
    );
  }

  export default TablaDeNotas;*/