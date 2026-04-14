import { BrowserRouter, Routes, Route } from "react-router-dom"


import Inicio from "./pages/Inicio/Inicio"
import SobreNosotros from "./pages/SobreNosotros/SobreNosotros"
import Servicios from "./pages/Servicios/Servicios"
import Repositorio from "./pages/Repositorio/Repositorio"
import RepositorioCarrera from "./pages/RepositorioCarrera/RepositorioCarrera"
import Avisos from "./pages/Avisos"
import SolicitarTutoria from "./pages/Servicios/SolicitarTutoria/SolicitarTutoria"



function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/sobre-nosotros" element={<SobreNosotros />} />

        <Route path="/servicios" element={<Servicios />} />

        <Route path="/repositorio" element={<Repositorio />} />

        <Route path="/repositorio/:carrera" element={<RepositorioCarrera />} /> 

        <Route path="/solicitar-tutoria" element={<SolicitarTutoria/>}/> 
      

      </Routes>

    </BrowserRouter>

  )

}

export default App