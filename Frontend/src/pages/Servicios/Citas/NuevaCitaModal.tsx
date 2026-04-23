import "./NuevaCitaModal.css"
import { useState } from "react"
import ReactDOM from "react-dom"

interface Props {
  isOpen: boolean
  onClose: () => void
}

function NuevaCitaModal({ isOpen, onClose }: Props) {

  const [form, setForm] = useState({
    materia: "",
    tutor: "",
    fecha: "",
    hora: "",
    lugar: "",
    notas: ""
  })

  const materias = ["Cálculo II", "Intro to Python", "Literatura Mexicana"]
  const tutores = ["Dr. García", "M.C. Roberto Hernández", "Dra. Elena Pontes"]

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value }) // ✅ solo actualiza el estado
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // ✅ guarda en localStorage al enviar el formulario
    const citas = JSON.parse(localStorage.getItem("citas") || "[]")
    citas.push(form)
    localStorage.setItem("citas", JSON.stringify(citas))

    onClose()
  }

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-cita" onClick={(e) => e.stopPropagation()}>

        <div className="modal-left">
          <span className="badge">NUEVO REGISTRO</span>
          <h2>Agendar Nueva Cita</h2>
          <p>Asegura un espacio con los mejores tutores de la FES Acatlán para fortalecer tu trayectoria académica.</p>
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">✔</span>
              <span>Verificación de disponibilidad inmediata</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔔</span>
              <span>Notificaciones vía correo institucional</span>
            </div>
          </div>
        </div>

        <form className="modal-right" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label>MATERIA</label>
              <div className="select-wrapper">
                <select name="materia" value={form.materia} onChange={handleChange} required>
                  <option value="" disabled>Selecciona una asignatura</option>
                  {materias.map((m, i) => <option key={i} value={m}>{m}</option>)}
                </select>
                <span className="select-arrow">▾</span>
              </div>
            </div>

            <div className="form-group">
              <label>TUTOR</label>
              <div className="select-wrapper">
                <select name="tutor" value={form.tutor} onChange={handleChange} required>
                  <option value="" disabled>Selecciona un tutor</option>
                  {tutores.map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>
                <span className="select-arrow">▾</span>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>FECHA</label>
              <div className="input-wrapper">
                <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
                <span className="input-icon">📅</span>
              </div>
            </div>

            <div className="form-group">
              <label>HORARIO</label>
              <div className="input-wrapper">
                <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
                <span className="input-icon">🕐</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>SALÓN / LUGAR</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="lugar"
                value={form.lugar}
                onChange={handleChange}
                placeholder="Ej. Cubículo 302 o Sala de Juntas"
              />
              <span className="input-icon">📍</span>
            </div>
          </div>

          <div className="form-group">
            <label>NOTAS / OBSERVACIONES</label>
            <textarea
              name="notas"
              value={form.notas}
              onChange={handleChange}
              placeholder="Describe brevemente el tema a tratar..."
              rows={3}
            />
          </div>

          <div className="acciones">
            <button type="submit" className="btn-submit">📅 Crear Cita</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>,
    document.body
  )
}

export default NuevaCitaModal