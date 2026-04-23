import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"

function Sidebar() {
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const isSubmenuActive = (paths: string[]) => {
    return paths.some(path => location.pathname === path)
  }

  const toggleMenu = (menuName: string) => {
    if (openMenus.includes(menuName)) {
      setOpenMenus(openMenus.filter(item => item !== menuName))
    } else {
      setOpenMenus([...openMenus, menuName])
    }
  }

  const isMenuOpen = (menuName: string) => {
    return openMenus.includes(menuName)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🎓</div>
      </div>

      <div className="sidebar-user">
        <p className="sidebar-role">Administración</p>
        <p className="sidebar-school">PIT FES Acatlán</p>
      </div>

      <nav className="sidebar-nav">
        <Link to="/agenda" className={`nav-item ${isActive("/agenda") ? "active" : ""}`}>
          <span>⊞</span> Escritorio
        </Link>
        <Link to="/citas" className={`nav-item ${isActive("/citas") ? "active" : ""}`}>
          <span>📅</span> Citas de Tutoría
        </Link>
        <Link to="/agenda" className={`nav-item ${isActive("/agenda") ? "active" : ""}`}>
          <span>📋</span> Mi Agenda
        </Link>
        <Link to="/reportes" className={`nav-item ${isActive("/reportes") ? "active" : ""}`}>
          <span>📊</span> Reportes PIT
        </Link>
        
        {/* Menú expansivo para la administracion */}
        <div className="nav-item-container">
          <div 
            className={`nav-item ${isSubmenuActive(["/configuracion/bitacora", "/configuracion/usuarios", "/configuracion/roles", "/configuracion/accesos"]) ? "active-parent" : ""}`}
            onClick={() => toggleMenu("configuracion")}
          >
            <span>⚙</span> 
            <span>Administracion</span>
            <span className="nav-arrow">{isMenuOpen("configuracion") ? "▼" : "▶"}</span>
          </div>
          
          {isMenuOpen("configuracion") && (
            <div className="submenu">
              <Link 
                to="/bitacora" 
                className={`submenu-item ${isActive("/configuracion/bitacora") ? "active" : ""}`}
              >
                <span>📝</span> Bitácora
              </Link>
              <Link 
                to="/usuarios" 
                className={`submenu-item ${isActive("/configuracion/usuarios") ? "active" : ""}`}
              >
                <span>👥</span> Usuarios
              </Link>
              <Link 
                to="/roles" 
                className={`submenu-item ${isActive("/configuracion/roles") ? "active" : ""}`}
              >
                <span>🎭</span> Roles
              </Link>
              <Link 
                to="/accesos" 
                className={`submenu-item ${isActive("/configuracion/accesos") ? "active" : ""}`}
              >
                <span>🔐</span> Accesos
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <Link to="/ayuda" className="nav-item">
          <span>❓</span> Ayuda Técnica
        </Link>
        <Link to="/" className="nav-item nav-logout">
          <span>↪</span> Cerrar Sesión
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar