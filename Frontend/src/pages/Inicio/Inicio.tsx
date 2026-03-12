import "./Inicio.css"
import { Link } from "react-router-dom"

import Navbar from "../../components/Navbar/Navbar"
import fondo from "../../assets/images/Inicio.jpg"

function Inicio(){

return(

<div>

<Navbar/>

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

</div>

)

}

export default Inicio