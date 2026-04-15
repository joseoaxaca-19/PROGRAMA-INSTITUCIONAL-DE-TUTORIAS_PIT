import "./Servicios.css"
import Navbar from "../../components/Navbar/Navbar"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Card, CardContent, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"

import SchoolIcon from "@mui/icons-material/School"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import PsychologyIcon from "@mui/icons-material/Psychology"
import GroupsIcon from "@mui/icons-material/Groups"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"


function Servicios() {

    const [logueado, setLogueado] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Cuando se carga la página de servicios, hacer scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);


    const servicios = [

        {
            titulo: "Tutorías académicas",
            descripcion: "Sesiones de apoyo con tutores para mejorar el rendimiento académico en distintas asignaturas.",
            icono: <SchoolIcon sx={{ fontSize: 50 }} />
        },

        {
            titulo: "Asesoría académica",
            descripcion: "Orientación para resolver dudas sobre materias, planes de estudio y trayectoria escolar.",
            icono: <MenuBookIcon sx={{ fontSize: 50 }} />
        },

        {
            titulo: "Orientación vocacional",
            descripcion: "Apoyo para tomar decisiones sobre el desarrollo profesional y elección de especializaciones.",
            icono: <WorkspacePremiumIcon sx={{ fontSize: 50 }} />
        },

        {
            titulo: "Apoyo psicológico",
            descripcion: "Acompañamiento emocional para promover el bienestar físico y mental de los estudiantes.",
            icono: <PsychologyIcon sx={{ fontSize: 50 }} />
        },

        {
            titulo: "Talleres y cursos",
            descripcion: "Actividades formativas para fortalecer habilidades académicas y personales.",
            icono: <GroupsIcon sx={{ fontSize: 50 }} />
        }

    ]

    return (

        <div>

            <Navbar />

            <section id="servicios" className="servicios">

                <h1>Servicios del Sistema de Tutorías</h1>

                <p>
                    El sistema de tutorías de la FES Acatlán ofrece diferentes servicios de apoyo para el desarrollo académico y personal de los estudiantes.
                </p>

                <div className="servicios-grid">

                    {servicios.map((servicio, index) => (

                        <Card className="servicio-card" key={index}>

                            <CardContent>

                                <div className="icono">

                                    {servicio.icono}

                                </div>

                                <Typography variant="h6" className="titulo">

                                    {servicio.titulo}

                                </Typography>

                                <Typography variant="body2" className="descripcion">

                                    {servicio.descripcion}

                                </Typography>

    <div className="botones-servicio">

            <Button
            variant="contained"
            component={Link}
            to="/solicitar-tutoria"
            className="boton-servicio"
            >
            Solicitar tutoría
            </Button>

    <Button
        variant="outlined"
        className="boton-secundario"
    >
        Ver más
    </Button>

    {logueado && (

<Button>
  Solicitar tutoría
</Button>

)}

</div>

                            </CardContent>

                        </Card>



                    ))}

                </div>

            </section>

        </div>

    )

}

export default Servicios