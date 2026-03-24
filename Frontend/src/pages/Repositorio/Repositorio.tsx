import "./Repositorio.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"

function Repositorio(){

const navigate = useNavigate()

const carreras = [

"Actuaría",
"Arquitectura",
"Ciencia de Datos",
"Ciencias Políticas y Administración Pública",
"Comunicación",
"Derecho",
"Diseño Gráfico",
"Economía",
"Enseñanza de Inglés",
"Filosofía",
"Historia",
"Ingeniería Civil",
"Lengua y Literatura Hispánicas",
"Matemáticas Aplicadas y Computación",
"Pedagogía",
"Relaciones Internacionales",
"Sociología"

]

const [carrera,setCarrera] = useState("")

const irRepositorio = () => {

if(carrera !== ""){
navigate(`/repositorio/${carrera}`)
}

}

return(

<div>

<Navbar/>

<section className="repositorio">

<h1>Repositorio Académico</h1>

<p>
Selecciona tu carrera para acceder a los recursos académicos disponibles.
</p>

<div className="selector">

<select
value={carrera}
onChange={(e)=>setCarrera(e.target.value)}
>

<option value="">Selecciona tu carrera</option>

{carreras.map((carrera,index)=>(

<option key={index} value={carrera}>
{carrera}
</option>

))}

</select>

<button onClick={irRepositorio}>
Entrar al repositorio
</button>

</div>

</section>

</div>

)

}

export default Repositorio