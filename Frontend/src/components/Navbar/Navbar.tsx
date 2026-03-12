import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { useState } from "react"

function Navbar() {

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

<NavLink to="/login" className="login-btn">
Login
</NavLink>

</nav>

)

}

export default Navbar