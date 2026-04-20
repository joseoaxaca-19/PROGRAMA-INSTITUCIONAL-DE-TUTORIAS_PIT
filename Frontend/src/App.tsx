import { BrowserRouter, Routes, Route } from "react-router-dom"


import Inicio from "./pages/Inicio/Inicio"
import SobreNosotros from "./pages/SobreNosotros/SobreNosotros"
import Servicios from "./pages/Servicios/Servicios"
import Repositorio from "./pages/Repositorio/Repositorio"
import RepositorioCarrera from "./pages/RepositorioCarrera/RepositorioCarrera"
import Avisos from "./pages/Avisos/Avisos"
import AdminAvisos from "./pages/Avisos/AdminAvisos"
import SolicitarTutoria from "./pages/Servicios/SolicitarTutoria/SolicitarTutoria"
import Agenda from "./pages/Agenda/Agenda"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/sobre-nosotros" element={<SobreNosotros />} />

        <Route path="/servicios" element={<Servicios />} />

        <Route path="/repositorio" element={<Repositorio />} />

        <Route path="/repositorio/:carrera" element={<RepositorioCarrera />} /> 

        <Route path="/avisos" element={<Avisos />} /> 

        <Route path="/admin-avisos" element={<AdminAvisos />} /> 

        <Route path="/solicitar-tutoria" element={<SolicitarTutoria/>}/> 

        <Route path="/agenda" element={<Agenda />} />

      </Routes>

    </BrowserRouter>

  )

}

export default App
