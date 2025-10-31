import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [dni, setDni] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();//es una abreviatura de “event”, y representa el evento del formulario que se dispara cuando el usuario hace clic en “Registrarse”.

    // Validación de DNI
    if (!/^\d{7,8}$/.test(dni)) {
      setError("El DNI debe tener 7 u 8 dígitos numéricos");
      return; //detiene el envio si no cumple con esto

    }

    // Validación de nombre y apellido (solo letras)
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!soloLetras.test(nombre.trim())) {
     setError("El nombre solo puede contener letras");
     return;
    }

if (!soloLetras.test(apellido.trim())) {
  setError("El apellido solo puede contener letras");
  return;
}


    setLoading(true);
    setError('');

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: usuario,
          password: clave,
          dni,
          nombre,
          apellido
        })
      });

      const resultado = await response.text();

      if (response.ok) {
        alert("Registro exitoso");
        navigate('/');
      } else {
        setError(resultado);
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (

    
  <div className="register-container">
    <video autoPlay muted loop className="background-video">
      <source src="/imagenes/VIDEO ESTUDIANTES DE FONDO.mp4" type="video/mp4" />
    </video>

    <h2>Registro de Ingresante</h2>
    <form onSubmit={manejarRegistro}>
      {loading && <div className="loading-message">Procesando registro...</div>}
      {error && <div className="error-message">{error}</div>}


     <input
      type="text"
      placeholder="DNI"
      value={dni}
      onChange={(e) => {
      setDni(e.target.value);
      setError('');
      }}
      required
      />
        <small className="campo-sugerido">Ingresá tu DNI sin puntos ni letras (7 u 8 dígitos)</small>




        
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => {setUsuario(e.target.value);
          setError('');
          }}
          required
        />
        <small className="campo-sugerido">Elegí un nombre de usuario único para tu cuenta</small>


        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => {setClave(e.target.value);
            setError('');
          }}
          required
        />
        <small className="campo-sugerido">Usá al menos 6 caracteres, combinando letras y números</small>


        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>{ setNombre(e.target.value);
            setError('');
          }}
          required
        />
        <small className="campo-sugerido">Solo letras. Ejemplo: Juan, María</small>

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => {setApellido(e.target.value);
            setError('');
          }}
          required
        />
        <small className="campo-sugerido">Solo letras. Ejemplo: Pérez, González</small>


        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}

export default Register;