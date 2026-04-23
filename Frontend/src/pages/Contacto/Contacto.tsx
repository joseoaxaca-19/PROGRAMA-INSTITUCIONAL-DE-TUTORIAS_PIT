import Navbar from "../../components/Navbar/Navbar"
import './Contacto.css'

const Contacto = () => {
  const ubicacion = {
    nombre: "FES Acatlán, UNAM",
    direccion: "Av. Alcanfores y San Juan Totoltepec s/n, Sta Cruz Acatlán, 53150 Naucalpan de Juárez, Estado de México"
  }

  return (
    <div>
      <Navbar/>
      <section id="contacto" className="contacto-section">
        <div className="contacto-container">
          <h2 className="contacto-title">Contacto</h2>
          
          <div className="contacto-grid">
            {/* Columna izquierda - Información de contacto */}
            <div className="contacto-card">
              <div className="contacto-item">
                <div className="contacto-icon email-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contacto-info">
                  <h3 className="info-label">CORREO ELECTRÓNICO</h3>
                  <a href="mailto:tutorias@pitfesacatlan.unam.mx" className="info-value">
                    tutorias@pitfesacatlan.unam.mx
                  </a>
                </div>
              </div>

              <div className="contacto-divider"></div>

              {/* Facebook */}
              <div className="contacto-item">
                <div className="contacto-icon facebook-icon">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="contacto-info">
                  <h3 className="info-label">FACEBOOK</h3>
                  <a 
                    href="https://www.facebook.com/FESAcatlanUNAM" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="info-value"
                  >
                    FES Acatlán UNAM
                  </a>
                </div>
              </div>

              <div className="contacto-divider"></div>

              {/* Instagram */}
              <div className="contacto-item">
                <div className="contacto-icon instagram-icon">
                  <i className="fab fa-instagram"></i>
                </div>
                <div className="contacto-info">
                  <h3 className="info-label">INSTAGRAM</h3>
                  <a 
                    href="https://www.instagram.com/fes_acatlan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="info-value"
                  >
                    @fesacatlan
                  </a>
                </div>
              </div>

              <div className="contacto-divider"></div>

              <div className="contacto-item">
                <div className="contacto-icon location-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contacto-info">
                  <h3 className="info-label">UBICACIÓN</h3>
                  <p className="info-value">{ubicacion.nombre}</p>
                  <p className="info-direccion">{ubicacion.direccion}</p>
                </div>
              </div>
            </div>

            {/* Columna derecha - Mapa */}
            <div className="contacto-mapa">
              <div className="mapa-container">
                <iframe
                  title="mapa-fes-acatlan"
                  src="https://maps.google.com/maps?q=FES+Acatlán+UNAM&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mapa-info">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=FES+Acatlán+UNAM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mapa"
                >
                  <i className="fas fa-external-link-alt"></i> Abrir en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contacto