import "./Navbar.css"
import { NavLink, useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect } from "react";
import Logo from "../../assets/icons/unam_logo.svg";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      // Solo detectar scroll si estamos en la página de inicio
      if (location.pathname === "/") {
        const sections = ["inicio", "sobre_nosotros", "servicios", "agenda", "repositorio", "contacto"]
        
        // Encontrar la sección actualmente visible
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // Si la sección está cerca de la parte superior de la pantalla
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  // Resetear cuando cambia la ruta
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("")
    } else if (location.pathname !== "/") {
      setActiveSection("")
    } else if (location.hash) {
      // Si hay un hash, activar esa sección
      const section = location.hash.replace("#", "")
      setActiveSection(section)
    }
  }, [location])

  const handleClick = (sectionId: string) => {
      setMenuOpen(false);
      setActiveSection(sectionId)
      // Navegar a la página de inicio con el hash
      navigate(`/#${sectionId}`);
      // Pequeño retraso para asegurar que la página cargue antes del scroll
      setTimeout(() => {
        const elemento = document.getElementById(sectionId);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

  // Función para determinar si un link está activo
  const isActive = (sectionId: string) => {
    if (location.pathname !== "/") return false
    return activeSection === sectionId
  }

return (

<nav className="navbar">

<NavLink to="/" className="logo">

<img src={Logo} className="logo-icon" alt="Logo UNAM" />


<span className="logo-pit">PIT</span>
<span className="logo-fes">FES ACATLÁN</span>

</NavLink>

{/* BOTON HAMBURGUESA */}

<div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
<span className="material-symbols-outlined">
menu
</span>
</div>

<ul className={`menu ${menuOpen ? "open" : ""}`}>

<li>
  <button 
    className={`nav-button ${location.pathname === "/" && activeSection === "inicio" ? "active" : ""}`}
    onClick={() => handleClick('inicio')}
  >
    Inicio
  </button>
</li>

<li>
  <button 
    className={`nav-button ${location.pathname === "/" && activeSection === "sobre_nosotros" ? "active" : ""}`}
    onClick={() => handleClick('sobre_nosotros')}
  >
    Sobre Nosotros
  </button>
</li>

<li>
  <button 
    className={`nav-button ${location.pathname === "/" && activeSection === "servicios" ? "active" : ""}`}
    onClick={() => handleClick('servicios')}
  >
    Servicios
  </button>
</li>

<li>
  <button 
    className={`nav-button ${location.pathname === "/" && activeSection === "divisiones" ? "active" : ""}`}
    onClick={() => handleClick('divisiones')}
  >
    Divisiones
  </button>
</li>

<li>
  <button 
    className={`nav-button ${location.pathname === "/" && activeSection === "avisos" ? "active" : ""}`}
    onClick={() => handleClick('avisos')}
  >
    Avisos
  </button>
</li>

<li>
  <button 
    className={`nav-button ${location.pathname === "/" && activeSection === "contacto" ? "active" : ""}`}
    onClick={() => handleClick('contacto')}
  >
    Contacto
  </button>
</li>

</ul>

<NavLink to="/login" className="login-btn">
Login
</NavLink>

</nav>

)

}

export default Navbar