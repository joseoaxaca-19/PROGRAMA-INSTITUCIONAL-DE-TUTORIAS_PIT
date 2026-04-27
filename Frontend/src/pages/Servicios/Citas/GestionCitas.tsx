import "./GestionCitas.css"
import "../../../components/Sidebar/Sidebar.css"
import { useState, useEffect } from "react"
import NuevaCitaModal from "./NuevaCitaModal"
import Sidebar from "../../../components/Sidebar/Sidebar"

const materiaIconos: Record<string, string> = {
  "Cálculo II": "Σ",
  "Intro to Python": "⌨",
  "Literatura Mexicana": "📖",
}

const materiaColores: Record<string, string> = {
  "Cálculo II": "#e8f0fe",
  "Intro to Python": "#e6f4ea",
  "Literatura Mexicana": "#fce8e6",
}

function GestionCitas() {
  const [openModal, setOpenModal] = useState(false)
  const [citas, setCitas] = useState<any[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [fechaFiltro, setFechaFiltro] = useState("")

  const cargarCitas = () => {
    const data = JSON.parse(localStorage.getItem("citas") || "[]")
    setCitas(data)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    cargarCitas()
  }

  const eliminarCita = (index: number) => {
    const nuevas = citas.filter((_, i) => i !== index)
    localStorage.setItem("citas", JSON.stringify(nuevas))
    setCitas(nuevas)
  }

  useEffect(() => {
    cargarCitas()
  }, [])

  const citasFiltradas = citas.filter(c => {
    const matchBusqueda =
      c.materia?.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.tutor?.toLowerCase().includes(busqueda.toLowerCase())
    const matchFecha = fechaFiltro ? c.fecha === fechaFiltro : true
    return matchBusqueda && matchFecha
  })

  return (
    <div className="gc-layout">
      <Sidebar />

      {/* Contenido principal */}
      <main className="gc-main">
        {/* Topbar */}
        <header className="gc-topbar">
          <span className="gc-breadcrumb">Panel › Citas</span>
          <div className="gc-topbar-right">
            <span className="gc-topbar-bell">🔔</span>
            <div className="gc-topbar-user">
              <div>
                <p className="gc-topbar-name">Admin Usuario</p>
                <p className="gc-topbar-role">COORDINADOR</p>
              </div>
              <div className="gc-topbar-avatar">AU</div>
            </div>
          </div>
        </header>

        {/* Encabezado */}
        <div className="gc-header">
          <div>
            <h1>Gestión de Citas de Tutoría</h1>
            <p>Administra y programa las sesiones académicas de acompañamiento.</p>
          </div>
          <button className="gc-btn-nueva" onClick={() => setOpenModal(true)}>
            + Nueva Cita
          </button>
        </div>

        {/* Filtros */}
        <div className="gc-filtros">
          <div className="gc-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Buscar materias, tutores o estudiantes..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
          <input
            type="date"
            className="gc-date-filter"
            value={fechaFiltro}
            onChange={e => setFechaFiltro(e.target.value)}
          />
          <button className="gc-btn-filtros">☰ Filtros</button>
        </div>

        {/* Tabla */}
        <div className="gc-tabla-wrapper">
          <table className="gc-tabla">
            <thead>
              <tr>
                <th>MATERIA</th>
                <th>TUTOR</th>
                <th>ESTUDIANTE</th>
                <th>FECHA</th>
                <th>HORA</th>
                <th>LUGAR (SALÓN)</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="gc-empty">No hay citas registradas</td>
                </tr>
              ) : (
                citasFiltradas.map((cita, i) => (
                  <tr key={i}>
                    <td>
                      <div className="gc-materia-cell">
                        <span
                          className="gc-materia-icon"
                          style={{ background: materiaColores[cita.materia] || "#f0f0f0" }}
                        >
                          {materiaIconos[cita.materia] || "📚"}
                        </span>
                        <strong>{cita.materia}</strong>
                      </div>
                    </td>
                    <td>
                      <div className="gc-tutor-cell">
                        <div className="gc-avatar-small">{cita.tutor?.[0]}</div>
                        {cita.tutor}
                      </div>
                    </td>
                    <td className="gc-muted">—</td>
                    <td className="gc-fecha">{cita.fecha}</td>
                    <td>
                      <span className="gc-hora-badge">{cita.hora}</span>
                    </td>
                    <td>
                      <span className="gc-lugar-badge">{cita.lugar || "—"}</span>
                    </td>
                    <td>
                      <div className="gc-acciones">
                        <button className="gc-btn-icono" title="Editar">✏️</button>
                        <button className="gc-btn-icono" title="Eliminar" onClick={() => eliminarCita(i)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="gc-total">Mostrando {citasFiltradas.length} de {citas.length} citas programadas</p>
      </main>

      <NuevaCitaModal isOpen={openModal} onClose={handleCloseModal} />
    </div>
  )
}

export default GestionCitas