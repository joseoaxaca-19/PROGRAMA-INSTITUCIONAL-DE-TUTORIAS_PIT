import "./SolicitarTutoria.css"
import Navbar from "../../../components/Navbar/Navbar"
import { useState } from "react"

import { TextField, Button, MenuItem } from "@mui/material"

function SolicitarTutoria(){

const [form,setForm] = useState({

nombre:"",
correo:"",
carrera:"",
materia:"",
tipo:"",
descripcion:""

})

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

const handleChange = (e:any)=>{

setForm({

...form,
[e.target.name]:e.target.value

})

}

const enviarSolicitud = (e:any)=>{

e.preventDefault()

console.log("Solicitud enviada:",form)

alert("Solicitud enviada correctamente")

}

return(

<div>

<Navbar/>

<section className="solicitar">

<h1>Solicitar Tutoría</h1>

<p>
Completa el siguiente formulario para solicitar una tutoría académica.
</p>

<form className="formulario" onSubmit={enviarSolicitud}>

<TextField
label="Nombre completo"
name="nombre"
fullWidth
required
onChange={handleChange}
/>

<TextField
label="Correo institucional"
name="correo"
fullWidth
required
onChange={handleChange}
/>

<TextField
select
label="Carrera"
name="carrera"
fullWidth
required
onChange={handleChange}
>

{carreras.map((carrera,index)=>(

<MenuItem key={index} value={carrera}>

{carrera}

</MenuItem>

))}

</TextField>

<TextField
label="Materia"
name="materia"
fullWidth
required
onChange={handleChange}
/>

<TextField
select
label="Tipo de tutoría"
name="tipo"
fullWidth
required
onChange={handleChange}
>

<MenuItem value="Academica">Académica</MenuItem>
<MenuItem value="Orientacion">Orientación académica</MenuItem>
<MenuItem value="Apoyo">Apoyo personal</MenuItem>

</TextField>

<TextField
label="Describe tu duda o problema"
name="descripcion"
multiline
rows={4}
fullWidth
onChange={handleChange}
/>

<Button
type="submit"
variant="contained"
className="boton-enviar"
>

Enviar solicitud

</Button>

</form>

</section>

</div>

)

}

export default SolicitarTutoria