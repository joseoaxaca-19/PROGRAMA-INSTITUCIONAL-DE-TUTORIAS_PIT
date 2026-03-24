import { useState } from "react";
import "./Inicio.css"
import { Link } from "react-router-dom"

import Navbar from "../../components/Navbar/Navbar"
import fondo from "../../assets/images/Inicio.jpg"
import Footer from "../../components/Footer/Footer"
import Login from "../../pages/Login/Login" // Asegúrate de que la ruta sea correcta

function Inicio() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  return(
    <div className="inicio-container">
      {/* Pasamos la función openLogin al Navbar */}
      <Navbar onLoginClick={openLogin} />

      <section
        className="hero"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Programa de Tutorías</h1>
          <p>
            Impulsando tu éxito académico con el apoyo de nuestra comunidad
            universitaria y herramientas de aprendizaje colaborativo.
          </p>
          <div className="botones">
            <Link to="/servicios" className="btn-comenzar">
              Comencemos
            </Link>
            <Link to="/sobrenosotros" className="btn-info">
              Ver más info
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Componente Login que aparece cuando se hace clic */}
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
    </div>
  )
}

export default Inicio