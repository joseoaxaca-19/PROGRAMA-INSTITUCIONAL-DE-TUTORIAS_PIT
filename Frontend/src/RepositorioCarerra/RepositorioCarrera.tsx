import "./RepositorioCarrera.css"
import { useParams } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/Navbar/Navbar"

function RepositorioCarrera(){

const { carrera } = useParams<{ carrera: string }>()

const categorias = [
"Archivos",
"Guías",
"Fotos",
"Videos",
"Libros",
"Enlaces"
]

const [categoriaActiva, setCategoriaActiva] = useState("Archivos")

const recursos:any = {

Archivos:[
"Apuntes_Clase1.pdf",
"Guia_Estudio.pdf",
"Practica1.docx"
],

Guías:[
"Guia_Algebra.pdf",
"Guia_Calculo.pdf"
],

Fotos:[
"Clase1.png",
"EjemploGrafica.jpg"
],

Videos:[
"Clase_Introduccion.mp4",
"Tutoría_Calculo.mp4"
],

Libros:[
"Libro_Algebra.pdf",
"Libro_Estadistica.pdf"
],

Enlaces:[
"Biblioteca UNAM",
"Repositorio Académico",
"Google Scholar"
]

}

return(

<div>

<Navbar/>

<section className="repo-carrera">

<h1>Repositorio - {carrera}</h1>

<p>
Explora los recursos disponibles para tu carrera.
</p>

{/* Pestañas */}

<div className="tabs">

{categorias.map((categoria,index)=>(

<button
key={index}
className={categoriaActiva === categoria ? "tab-activa" : "tab"}
onClick={()=>setCategoriaActiva(categoria)}
>

{categoria}

</button>

))}

</div>

{/* Contenido */}

<div className="contenido">

<h2>{categoriaActiva}</h2>

<ul>

{recursos[categoriaActiva].map((recurso:string,index:number)=>(

<li key={index}>{recurso}</li>

))}

</ul>

</div>

</section>

</div>

)

}

export default RepositorioCarrera