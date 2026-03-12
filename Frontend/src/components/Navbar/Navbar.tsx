import "./Navbar.css"
import { NavLink } from "react-router-dom"

function Navbar() {

return (

<nav className="navbar">

<NavLink to="/" className="logo">

<span className="material-symbols-outlined logo-icon">
school
</span>

<span className="logo-pit">PIT</span>
<span className="logo-fes">FES ACATLÁN</span>

</NavLink>

<ul className="menu">

<li>
<NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
Inicio
</NavLink>
</li>

<li>
<NavLink to="/sobrenosotros" className={({isActive}) => isActive ? "active" : ""}>
Sobre nosotros
</NavLink>
</li>

<li>
<NavLink to="/servicios" className={({isActive}) => isActive ? "active" : ""}>
Servicios
</NavLink>
</li>

<li>
<NavLink to="/agenda" className={({isActive}) => isActive ? "active" : ""}>
Agenda
</NavLink>
</li>

<li>
<NavLink to="/repositorio" className={({isActive}) => isActive ? "active" : ""}>
Repositorio
</NavLink>
</li>

<li>
<NavLink to="/contacto" className={({isActive}) => isActive ? "active" : ""}>
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
