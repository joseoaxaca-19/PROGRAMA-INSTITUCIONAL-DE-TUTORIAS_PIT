import "./Navbar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/icons/unam_logo.svg";
import Login from "../../pages/Login/Login"; // Importa el componente Login

interface NavbarProps {
  onLoginClick?: () => void;
}

function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para el modal
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar scroll y actualizar sección activa (solo en homepage)
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        const sections = ["inicio", "sobre_nosotros", "servicios", "divisiones", "avisos", "contacto"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Resetear sección activa al cambiar de ruta
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
    } else if (location.hash) {
      const section = location.hash.replace("#", "");
      setActiveSection(section);
    }
  }, [location]);

  const handleClick = (sectionId: string) => {
    setMenuOpen(false);
    setActiveSection(sectionId);
    navigate(`/#${sectionId}`);
    setTimeout(() => {
      const elemento = document.getElementById(sectionId);
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      setIsLoginModalOpen(true); // Abre el modal en lugar de navegar
    }
  };

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
              className={`nav-button ${isActive("sobre_nosotros") ? "active" : ""}`}
              onClick={() => handleClick("sobre_nosotros")}
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
              className={`nav-button ${isActive("avisos") ? "active" : ""}`}
              onClick={() => handleClick("avisos")}
            >
              Avisos
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
        </ul>

        <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button>
      </nav>

      {/* Renderiza el modal de login */}
      <Login isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default Navbar;  