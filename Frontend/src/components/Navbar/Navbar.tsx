import "./Navbar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/icons/unam_logo.svg";
import Login from "../../pages/Login/Login";

interface NavbarProps {
  onLoginClick?: () => void;
}

function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolling = useRef(false);

  // Obtener altura del navbar dinámicamente
  const getNavbarHeight = () => {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.getBoundingClientRect().height : 80;
  };

  useEffect(() => {
    // Solo ejecutar en la página principal
    if (location.pathname !== "/") return;

    // Verificar si las secciones existen
    const checkSections = () => {
      const sections = ["inicio", "sobre-nosotros", "servicios", "divisiones", "avisos", "contacto"];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (!element) {
          console.warn(`Sección no encontrada: ${section}`);
        }
      });
    };

    // Esperar a que el DOM esté listo
    const timeoutId = setTimeout(checkSections, 100);

    const handleScroll = () => {
      if (isScrolling.current) return;

      const sections = ["inicio", "sobre-nosotros", "servicios", "divisiones", "avisos", "contacto"];
      const navbarHeight = getNavbarHeight();
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Usar un umbral más flexible
          if (rect.top <= navbarHeight + 50 && rect.bottom >= navbarHeight) {
            currentSection = section;
            break;
          }
        }
      }

      const usuario = localStorage.getItem("usuario")
      if (usuario) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }



    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Detectar sección inicial

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, activeSection]);

  const handleClick = (sectionId: string) => {
    setMenuOpen(false);
    setActiveSection(sectionId);
    isScrolling.current = true;

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = getNavbarHeight();
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Actualizar URL sin causar navegación
      window.history.pushState(null, "", `/#${sectionId}`);

      // Rehabilitar detección de scroll después de la animación
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    } else {
      console.error(`Elemento con id "${sectionId}" no encontrado`);
      isScrolling.current = false;
    }
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    if (onLoginClick) {
      onLoginClick();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario")
    window.location.reload()
  }

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const isActive = (sectionId: string) => {
    return location.pathname === "/" && activeSection === sectionId;
  };

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="logo">
          <img src={Logo} className="logo-icon" alt="Logo UNAM" />
          <span className="logo-pit">PIT</span>
          <span className="logo-fes">FES ACATLÁN</span>
        </NavLink>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">menu</span>
        </div>

        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          <li>
            <button
              className={`nav-button ${isActive("inicio") ? "active" : ""}`}
              onClick={() => handleClick("inicio")}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${isActive("avisos") ? "active" : ""}`}
              onClick={() => handleClick("avisos")}
            >
              Avisos
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${isActive("sobre-nosotros") ? "active" : ""}`}
              onClick={() => handleClick("sobre-nosotros")}
            >
              Sobre Nosotros
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${isActive("servicios") ? "active" : ""}`}
              onClick={() => handleClick("servicios")}
            >
              Servicios
            </button>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/citas" className="nav-button">
                Citas
              </NavLink>
            </li>
          )}
        
          <li>
            <button
              className={`nav-button ${isActive("divisiones") ? "active" : ""}`}
              onClick={() => handleClick("divisiones")}
            >
              Divisiones
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${isActive("contacto") ? "active" : ""}`}
              onClick={() => handleClick("contacto")}
            >
              Contacto
            </button>
          </li>
          <li>
            {isLoggedIn ? (
              <button className="login-btn" onClick={cerrarSesion}>
                Cerrar Sesión
              </button>
            ) : (
              <button className="login-btn" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>

      <Login isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default Navbar;