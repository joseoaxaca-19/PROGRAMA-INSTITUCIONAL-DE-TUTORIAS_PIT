import { BrowserRouter, Routes, Route } from "react-router-dom"

import Inicio from "./pages/Inicio/Inicio"
import SobreNosotros from "./pages/SobreNosotros/SobreNosotros"
import Servicios from "./pages/Servicios/Servicios"
import GestionCitas from "./pages/Servicios/Citas/GestionCitas"
import Repositorio from "./pages/Repositorio/Repositorio"
import RepositorioCarrera from "./pages/RepositorioCarrera/RepositorioCarrera"
import Avisos from "./pages/Avisos/Avisos"
import AdminAvisos from "./pages/Avisos/AdminAvisos"
import SolicitarTutoria from "./pages/Servicios/SolicitarTutoria/SolicitarTutoria"
import Agenda from "./pages/Agenda/Agenda"
import Bitacora from "./pages/Permisos/Bitacora/Bitacora"
import Divisiones from "./pages/Divisiones/Divisiones"
import Accesos from "./pages/Permisos/Accesos/Accesos"
import Roles from "./pages/Permisos/Roles/Roles"
import Usuarios from "./pages/Permisos/Usuarios/Usuarios"
import Reportes from "./pages/Reportes/Reportes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/divisiones" element={<Divisiones />} />
        <Route path="/citas" element={<GestionCitas />} />
        <Route path="/repositorio" element={<Repositorio />} />
        <Route path="/repositorio/:carrera" element={<RepositorioCarrera />} />
        <Route path="/avisos" element={<Avisos />} />
        <Route path="/admin-avisos" element={<AdminAvisos />} />
        <Route path="/solicitar-tutoria" element={<SolicitarTutoria />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/bitacora" element={<Bitacora />} />
        <Route path="/accesos" element={<Accesos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/reportes" element={<Reportes />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App