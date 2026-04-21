import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Inicio from './pages/Inicio/Inicio.tsx'
import SobreNosotros from './pages/SobreNosotros/SobreNosotros.tsx'
import Servicios from './pages/Servicios/Servicios.tsx'
import Divisiones from './pages/Divisiones/Divisiones.tsx'
import Avisos from './pages/Avisos/Avisos.tsx'
import AdminAvisos from "./pages/Avisos/AdminAvisos.tsx"
import Repositorio from './pages/Repositorio/Repositorio.tsx'
import Login from './pages/Login/Login.tsx'
import GestionCitas from './pages/Servicios/Citas/GestionCitas.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="sobre-nosotros" element={<SobreNosotros />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="divisiones" element={<Divisiones />} />
          <Route path="avisos" element={<Avisos />} />
          <Route path="admin-avisos" element={<AdminAvisos />} />
          <Route path="repositorio" element={<Repositorio />} />
          <Route path="login" element={<Login />} />
          <Route path="citas" element={<GestionCitas />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
