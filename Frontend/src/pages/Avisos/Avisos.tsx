import { useState, useEffect } from 'react';
import './Avisos.css';

interface Aviso {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string;
  enlace: string;
  color: string;
}

const Avisos = () => {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [avisoActual, setAvisoActual] = useState(0);
  const [mostrarCarrusel, setMostrarCarrusel] = useState(false);

  useEffect(() => {
    const avisosGuardados = localStorage.getItem('avisos');
    if (avisosGuardados) {
      setAvisos(JSON.parse(avisosGuardados));
    }
  }, []);

  useEffect(() => {
    if (avisos.length === 0) return;
    const timer = setTimeout(() => setMostrarCarrusel(true), 3000);
    return () => clearTimeout(timer);
  }, [avisos]);

  const cambiarAviso = (nuevoIndice: number) => {
    if (nuevoIndice >= 0 && nuevoIndice < avisos.length) {
      setAvisoActual(nuevoIndice);
    }
  };

  // Si no hay avisos, mostrar solo el hero
  if (avisos.length === 0) {
    return (
      <div className="hero-contenido visible">
        <h1>Programa de Tutorías</h1>
        <p>Impulsando tu éxito académico con el apoyo de nuestra comunidad universitaria.</p>
        <div className="botones">
          <a href="/servicios" className="btn-comenzar">Comencemos</a>
          <a href="/sobre-nosotros" className="btn-info">Ver más info</a>
        </div>
      </div>
    );
  }

  const avisoActualData = avisos[avisoActual];

  return (
    <>
      <div className={`hero-contenido ${!mostrarCarrusel ? 'visible' : 'oculto'}`}>
        <h1>Programa de Tutorías</h1>
        <p>Impulsando tu éxito académico con el apoyo de nuestra comunidad universitaria.</p>
        <div className="botones">
          <a href="/servicios" className="btn-comenzar">Comencemos</a>
          <a href="/sobre-nosotros" className="btn-info">Ver más info</a>
        </div>
      </div>

      <div className={`carrusel-container ${mostrarCarrusel ? 'visible' : 'oculto'}`}>
        {avisos.length > 1 && (
          <button className="carrusel-btn carrusel-btn-prev" onClick={() => cambiarAviso(avisoActual - 1)}>
            ❮
          </button>
        )}

        <div className="carrusel-wrapper">
          <div className="carrusel-slides" style={{ transform: `translateX(-${avisoActual * 100}%)` }}>
            {avisos.map((aviso) => (
              <div key={aviso.id} className="carrusel-slide">
                {/* Si tiene enlace, el contenedor es un link */}
                {aviso.enlace ? (
                  <a 
                    href={aviso.enlace} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="carrusel-link-full"
                    style={{ backgroundImage: aviso.imagen ? `url(${aviso.imagen})` : aviso.color }}
                  >
                    {/* Contenido oculto solo para referencia (no visible) */}
                    <div className="carrusel-info-oculta">
                      <h2>{aviso.titulo}</h2>
                      <p>{aviso.contenido}</p>
                    </div>
                  </a>
                ) : (
                  <div 
                    className="carrusel-contenido-full"
                    style={{ backgroundImage: aviso.imagen ? `url(${aviso.imagen})` : aviso.color }}
                  >
                    <div className="carrusel-info-oculta">
                      <h2>{aviso.titulo}</h2>
                      <p>{aviso.contenido}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {avisos.length > 1 && (
          <button className="carrusel-btn carrusel-btn-next" onClick={() => cambiarAviso(avisoActual + 1)}>
            ❯
          </button>
        )}

        {avisos.length > 1 && (
          <div className="carrusel-indicadores">
            {avisos.map((_, index) => (
              <button
                key={index}
                className={`indicador ${index === avisoActual ? 'activo' : ''}`}
                onClick={() => cambiarAviso(index)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Avisos;