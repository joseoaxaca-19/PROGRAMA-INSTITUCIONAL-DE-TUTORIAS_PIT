import "./RepositorioCarrera.css"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"

function RepositorioCarrera(){

const { carrera } = useParams()

const categorias = [

"Archivos",
"Guías",
"Fotos",
"Videos",
"Libros",
"Enlaces"

]

return(

<div>

<Navbar/>

<section className="repo-carrera">

<h1>Repositorio - {carrera}</h1>

<p>
Explora los recursos disponibles para tu carrera.
</p>

<div className="categorias">

{categorias.map((categoria,index)=>(

<div className="categoria-card" key={index}>

<h2>{categoria}</h2>

<p>
Explora los recursos disponibles en esta sección.
</p>

<button>Ver contenido</button>

</div>

))}

</div>

</section>

</div>

)

}

export default RepositorioCarrera