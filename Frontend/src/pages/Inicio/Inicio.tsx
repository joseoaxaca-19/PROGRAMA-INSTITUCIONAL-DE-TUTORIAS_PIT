import "./Inicio.css"

import Navbar from "../../components/Navbar/Navbar.tsx"

import fondo from "../../assets/images/Inicio.jpg"

function Inicio(){

return(

<div>

<Navbar/>

<section
className="hero"
style={{ backgroundImage: `url(${fondo})` }}
>

<div className="hero-content">

<h1>Programa de Tutorías</h1>

<p>
Impulsando tu éxito académico con el apoyo de nuestra comunidad
universitaria y herramientas de aprendizaje colaborativo.
</p>

<div className="botones">

<a href="#" className="btn-comenzar">
Comencemos
</a>

<a href="#" className="btn-info">
Ver más info
</a>

</div>

</div>

</section>

</div>

)

}

export default Inicio