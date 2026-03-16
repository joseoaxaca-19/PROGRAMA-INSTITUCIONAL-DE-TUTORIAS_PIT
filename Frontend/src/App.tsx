import { BrowserRouter, Routes, Route } from "react-router-dom"

import Inicio from "./pages/Inicio/Inicio"
import Servicios from "./pages/Servicios/Servicios"
import Repositorio from "./pages/Repositorio/Repositorio"
import RepositorioCarrera from "./pages/RepositorioCarrera/RepositorioCarrera"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/servicios" element={<Servicios />} />

        <Route path="/repositorio" element={<Repositorio />} />

         <Route path="/repositorio/:carrera" element={<RepositorioCarrera />} /> 

      </Routes>

    </BrowserRouter>

  )

}

export default App