import React, { createContext, useContext, useState } from 'react';

const MateriasContext = createContext();

export const useMaterias = () => {
  const context = useContext(MateriasContext);
  if (!context) {
    throw new Error('useMaterias debe usarse dentro de MateriasProvider');
  }
  return context;
};

export const MateriasProvider = ({ children }) => {
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

  return (
    <MateriasContext.Provider value={{ materias, setMaterias }}>
      {children}
    </MateriasContext.Provider>
  );
};