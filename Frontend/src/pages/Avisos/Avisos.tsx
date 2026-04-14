import React, { useState, useEffect, useCallback } from 'react';
import './Avisos.css';

const Avisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  // Cargar avisos del localStorage al iniciar
  useEffect(() => {
    const avisosGuardados = localStorage.getItem('avisosCarrusel');
    if (avisosGuardados) {
      setAvisos(JSON.parse(avisosGuardados));
    } else {
      // Avisos de ejemplo
      const avisosEjemplo = [
        { id: 1, titulo: '¡OFERTA ESPECIAL!', contenido: '30% de descuento en toda la tienda', tipo: 'oferta', enlace: '/ofertas', enlaceTexto: 'Ver ofertas' },
        { id: 2, titulo: 'NUEVO HORARIO', contenido: 'Ahora abiertos hasta las 8pm', tipo: 'info', enlace: '/horario', enlaceTexto: 'Conocer horario' },
        { id: 3, titulo: 'ENVÍO GRATIS', contenido: 'En compras mayores a $50,000', tipo: 'promocion', enlace: '/envios', enlaceTexto: 'Más información' }
      ];
      setAvisos(avisosEjemplo);
      localStorage.setItem('avisosCarrusel', JSON.stringify(avisosEjemplo));
    }
  }, []);

  // Cambiar slide automáticamente cada 5 segundos
  useEffect(() => {
    if (avisos.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [avisos.length, currentIndex]);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % avisos.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [avisos.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + avisos.length) % avisos.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [avisos.length, isAnimating]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleClickAviso = (aviso) => {
    if (aviso.enlace) {
      // Verificar si es una URL externa o interna
      if (aviso.enlace.startsWith('http') || aviso.enlace.startsWith('https')) {
        window.open(aviso.enlace, '_blank');
      } else {
        window.location.href = aviso.enlace;
      }
    }
  };

  const getTipoClase = (tipo) => {
    switch(tipo) {
      case 'oferta': return 'aviso-oferta';
      case 'promocion': return 'aviso-promocion';
      case 'alerta': return 'aviso-alerta';
      default: return 'aviso-info';
    }
  };

  if (avisos.length === 0) {
    return (
      <div className="aviso-carrusel-container">
        <div className="aviso-carrusel-vacio">
          <p>No hay avisos disponibles</p>
        </div>
      </div>
    );
  }

  const avisoActual = avisos[currentIndex];

  return (
    <div id="Avisos" className="aviso-carrusel-container">
      <div className="aviso-carrusel-wrapper">
        <div 
          className={`aviso-carrusel-slide ${getTipoClase(avisoActual.tipo)} ${isAnimating ? `aviso-slide-${direction}` : ''}`}
          onClick={() => handleClickAviso(avisoActual)}
        >
          <div className="aviso-contenido">
            <h3 className="aviso-titulo">{avisoActual.titulo}</h3>
            <p className="aviso-texto">{avisoActual.contenido}</p>
            {avisoActual.enlace && (
              <div className="aviso-enlace-container">
                <span className="aviso-enlace">
                  {avisoActual.enlaceTexto || 'Haz clic para más información'} →
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="aviso-carrusel-btn aviso-carrusel-btn-prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="aviso-carrusel-btn aviso-carrusel-btn-next" onClick={nextSlide}>
        ❯
      </button>

      <div className="aviso-carrusel-indicadores">
        {avisos.map((_, index) => (
          <button
            key={index}
            className={`aviso-indicador ${index === currentIndex ? 'aviso-indicador-activo' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Avisos;