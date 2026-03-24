import "./Inicio.css"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

import Navbar from "../../components/Navbar/Navbar"
import fondo from "../../assets/images/Inicio.jpg"

import SobreNosotros from "../SobreNosotros/SobreNosotros"
import Servicios from "../Servicios/Servicios"
import Divisiones from "../Divisiones/Divisiones"
import Avisos from "../Avisos/Avisos"
import Contacto from "../Contacto/Contacto"
import Footer from "../../components/Footer/Footer"

const Inicio = () => {
  const location = useLocation();

  useEffect(() => {
    
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const elemento = document.getElementById(id);
      if (elemento) {
        setTimeout(() => {
          elemento.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (

    <div>

      <Navbar />

      <section id="inicio"
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

      <SobreNosotros/>
      <Servicios/>
      <Divisiones/>
      <Avisos/>
      <Contacto/>
      <Footer/>

    </div>
  )

}


export default Inicio