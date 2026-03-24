import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { useState } from "react"

// Agregamos la interfaz para las props
interface NavbarProps {
  onLoginClick?: () => void // Función opcional para abrir el login
}

function Navbar({ onLoginClick }: NavbarProps) { // Recibimos la función como prop

const [menuOpen, setMenuOpen] = useState(false)

return (

<nav className="navbar">

<NavLink to="/" className="logo">

<span className="material-symbols-outlined logo-icon">
school
</span>

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
<NavLink to="/" onClick={()=>setMenuOpen(false)}>
Inicio
</NavLink>
</li>

<li>
<NavLink to="/sobrenosotros" onClick={()=>setMenuOpen(false)}>
Sobre nosotros
</NavLink>
</li>

<li>
<NavLink to="/servicios" onClick={()=>setMenuOpen(false)}>
Servicios
</NavLink>
</li>

<li>
<NavLink to="/agenda" onClick={()=>setMenuOpen(false)}>
Agenda
</NavLink>
</li>

<li>
<NavLink to="/repositorio" onClick={()=>setMenuOpen(false)}>
Repositorio
</NavLink>
</li>

<li>
<NavLink to="/contacto" onClick={()=>setMenuOpen(false)}>
Contacto
</NavLink>
</li>

</ul>

{/* Cambiamos NavLink por un botón */}
<button className="login-btn" onClick={onLoginClick}>
Login
</button>

</nav>

)

}

export default Navbar