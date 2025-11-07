import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MateriasProvider } from './MateriasContext'; // ← CONTEXT PROVIDER

import NavbarInstitucional from './NavbarInstitucional';
import Login from './Login';
import Donde from './Donde';
import SobreIFTS from './SobreIFTS';
import OfertaAcademica from './OfertaAcademica';
import Informatica from './pages/Informatica';
import Administracion from './pages/Administracion';
import Economia from './pages/Economia';
import Idiomas from './pages/Idiomas';
import Derecho from './pages/Derecho';
import Convenio from './Convenio';
import Register from './Register';
import Materias from './Materias';
import OpcionesAElegir from './OpcionesAElegir';
import Formulario from './Formulario';
import Chatbot from './Chatbot';
import Institucionalinicio from './Institucional-Inicio';
import TablaDeNotas from './TablaDeNotas';
import VideosYouTube from './componentes/VideosYouTube';
import LayoutNotas from './LayoutNotas';
import PerfilAlumno from './PerfilAlumno';

function App() {
  const location = useLocation();
  const showChatbot = location.pathname !== '/';

  return (
    <MateriasProvider> {/* ← ENVOLVER TODO CON EL PROVIDER */}
      <NavbarInstitucional />

      <Routes>
        <Route path="/" element={<Institucionalinicio />} />
        <Route path="/Formulario" element={<Formulario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/opcionesaelegir" element={<OpcionesAElegir />} />
        <Route path="/OfertaAcademica" element={<OfertaAcademica />} />
        <Route path="/Donde" element={<Donde />} />
        <Route path="/SobreIFTS" element={<SobreIFTS />} />
        <Route path="/OfertaAcademica" element={<OfertaAcademica />} />
        <Route path="/Convenio" element={<Convenio />} />
        <Route path="/Informatica" element={<Informatica />} />
        <Route path="/Administracion" element={<Administracion />} />
        <Route path="/Economia" element={<Economia />} />
        <Route path="/Idiomas" element={<Idiomas />} />
        <Route path="/Derecho" element={<Derecho />} />
        
        
        {/* 🆕 RUTA DE NOTAS CON LAYOUT - SIN PASAR PROPS */}
        <Route 
          path="/notas" 
          element={
            <LayoutNotas> {/* ← SIN materias prop */}
              <TablaDeNotas /> {/* ← SIN props */}
            </LayoutNotas>
          } 
        />

        <Route 
          path="/perfil/:alumnoId" 
          element={<PerfilAlumno />} 
        />
        
        {/* REDIRECCIONES PARA MANEJAR ERRORES Y RUTAS INEXISTENTES */}
        <Route path="/iniciar%20sesión" element={<Navigate to="/login" replace />} />
        <Route path="/iniciar-sesion" element={<Navigate to="/login" replace />} />
        <Route path="/signin" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Navigate to="/registro" replace />} />
        <Route path="/register" element={<Navigate to="/registro" replace />} />
        <Route path="/notes" element={<Navigate to="/notas" replace />} />
        <Route path="/calificaciones" element={<Navigate to="/notas" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/videos" element={<VideosYouTube />} />
        <Route path="/perfil" element={<PerfilAlumno />} />
        
        
      </Routes>

      {showChatbot && <Chatbot />}
    </MateriasProvider>
  );
}

export default App;