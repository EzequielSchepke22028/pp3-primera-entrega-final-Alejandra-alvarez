import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ URL CORREGIDA: /api/login en lugar de /api/auth/login
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: usuario,    // username (no email)
          password: clave
        })
      });

      const resultado = await response.json();

      if (response.ok) {
        setError('');
        
        // 🔑 Guardar token en localStorage
        localStorage.setItem("token", resultado.token);
        console.log('✅ Token guardado:', resultado.token);
        
        navigate('/opcionesaelegir');
      } else {
        setError(resultado.message || "Error desconocido");
      }

    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      setError("No se pudo conectar con el servidor");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="login-wrapper">
      <video autoPlay muted loop className="background-video">
        <source src="/imagenes/VIDEO ESTUDIANTES DE FONDO.mp4" type="video/mp4" />
      </video>

      <div className="login-panel">
        <h2>Acceso Campus IFTS</h2>
        <form onSubmit={manejarLogin}>
          {error && <div className="error-message">{error}</div>}

          <input
            type="text"
            placeholder="Usuario"
            aria-label="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            aria-label="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />

          <p className="registro-texto">
            <a href="/registro">¿No tiene usuario? Regístrese aquí</a>
          </p>
          
          <p className="button">
            <button type="submit">Ingresar</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;