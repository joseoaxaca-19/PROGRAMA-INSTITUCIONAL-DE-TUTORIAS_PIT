import React, { useState, useEffect } from 'react';


const AdministradorAvisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [nuevoAviso, setNuevoAviso] = useState({
    titulo: '',
    contenido: '',
    tipo: 'info',
    enlace: '',
    enlaceTexto: ''
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarAvisos();
  }, []);

  const cargarAvisos = () => {
    const avisosGuardados = localStorage.getItem('avisosCarrusel');
    if (avisosGuardados) {
      setAvisos(JSON.parse(avisosGuardados));
    }
  };

  const guardarAvisos = (nuevosAvisos) => {
    localStorage.setItem('avisosCarrusel', JSON.stringify(nuevosAvisos));
    setAvisos(nuevosAvisos);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAviso({
      ...nuevoAviso,
      [name]: value
    });
  };

  const agregarAviso = () => {
    if (!nuevoAviso.titulo || !nuevoAviso.contenido) {
      alert('Por favor completa el título y contenido del aviso');
      return;
    }

    const nuevoId = Date.now();
    const avisoCompleto = {
      ...nuevoAviso,
      id: nuevoId,
      enlaceTexto: nuevoAviso.enlaceTexto || 'Haz clic para más información'
    };

    const nuevosAvisos = [...avisos, avisoCompleto];
    guardarAvisos(nuevosAvisos);
    
    setNuevoAviso({
      titulo: '',
      contenido: '',
      tipo: 'info',
      enlace: '',
      enlaceTexto: ''
    });
  };

  const editarAviso = (aviso) => {
    setEditandoId(aviso.id);
    setNuevoAviso({
      titulo: aviso.titulo,
      contenido: aviso.contenido,
      tipo: aviso.tipo,
      enlace: aviso.enlace || '',
      enlaceTexto: aviso.enlaceTexto || ''
    });
  };

  const actualizarAviso = () => {
    const avisosActualizados = avisos.map(aviso =>
      aviso.id === editandoId
        ? { ...nuevoAviso, id: editandoId, enlaceTexto: nuevoAviso.enlaceTexto || 'Haz clic para más información' }
        : aviso
    );
    guardarAvisos(avisosActualizados);
    setEditandoId(null);
    setNuevoAviso({
      titulo: '',
      contenido: '',
      tipo: 'info',
      enlace: '',
      enlaceTexto: ''
    });
  };

  const eliminarAviso = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este aviso?')) {
      const avisosFiltrados = avisos.filter(aviso => aviso.id !== id);
      guardarAvisos(avisosFiltrados);
    }
  };

  return (
    <div className="admin-aviso-container">
      <h1 className="admin-aviso-titulo">Administrador de Avisos</h1>
      
      <div className="admin-aviso-formulario">
        <h2>{editandoId ? 'Editar Aviso' : 'Agregar Nuevo Aviso'}</h2>
        
        <div className="admin-form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={nuevoAviso.titulo}
            onChange={handleInputChange}
            placeholder="Ej: ¡OFERTA ESPECIAL!"
            className="admin-form-input"
          />
        </div>
        
        <div className="admin-form-group">
          <label>Contenido:</label>
          <textarea
            name="contenido"
            value={nuevoAviso.contenido}
            onChange={handleInputChange}
            placeholder="Describe el aviso..."
            className="admin-form-textarea"
            rows="3"
          />
        </div>
        
        <div className="admin-form-group">
          <label>Tipo:</label>
          <select
            name="tipo"
            value={nuevoAviso.tipo}
            onChange={handleInputChange}
            className="admin-form-select"
          >
            <option value="info">Información</option>
            <option value="oferta">Oferta</option>
            <option value="promocion">Promoción</option>
            <option value="alerta">Alerta</option>
          </select>
        </div>
        
        <div className="admin-form-group">
          <label>Enlace (opcional):</label>
          <input
            type="text"
            name="enlace"
            value={nuevoAviso.enlace}
            onChange={handleInputChange}
            placeholder="/ruta-interna o https://sitio.com"
            className="admin-form-input"
          />
          <small className="admin-form-help">Puedes usar rutas internas (ej: /productos) o URLs externas (ej: https://google.com)</small>
        </div>
        
        <div className="admin-form-group">
          <label>Texto del enlace (opcional):</label>
          <input
            type="text"
            name="enlaceTexto"
            value={nuevoAviso.enlaceTexto}
            onChange={handleInputChange}
            placeholder="Ej: Ver ofertas, Más información, Comprar ahora"
            className="admin-form-input"
          />
          <small className="admin-form-help">Si no lo especificas, se mostrará "Haz clic para más información"</small>
        </div>
        
        <button
          onClick={editandoId ? actualizarAviso : agregarAviso}
          className="admin-btn-guardar"
        >
          {editandoId ? 'Actualizar Aviso' : 'Agregar Aviso'}
        </button>
        
        {editandoId && (
          <button
            onClick={() => {
              setEditandoId(null);
              setNuevoAviso({
                titulo: '',
                contenido: '',
                tipo: 'info',
                enlace: '',
                enlaceTexto: ''
              });
            }}
            className="admin-btn-cancelar"
          >
            Cancelar
          </button>
        )}
      </div>
      
      <div className="admin-aviso-lista">
        <h2>Avisos Actuales ({avisos.length})</h2>
        
        {avisos.length === 0 ? (
          <p className="admin-no-avisos">No hay avisos creados. ¡Agrega uno!</p>
        ) : (
          <div className="admin-avisos-grid">
            {avisos.map(aviso => (
              <div key={aviso.id} className={`admin-aviso-card admin-aviso-card-${aviso.tipo}`}>
                <div className="admin-aviso-card-header">
                  <h3>{aviso.titulo}</h3>
                  <span className="admin-aviso-tipo-badge">{aviso.tipo}</span>
                </div>
                <p className="admin-aviso-card-contenido">{aviso.contenido}</p>
                {aviso.enlace && (
                  <>
                    <p className="admin-aviso-card-enlace">Enlace: {aviso.enlace}</p>
                    <p className="admin-aviso-card-texto-enlace">Texto: {aviso.enlaceTexto || 'Haz clic para más información'}</p>
                  </>
                )}
                <div className="admin-aviso-card-acciones">
                  <button
                    onClick={() => editarAviso(aviso)}
                    className="admin-btn-editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarAviso(aviso.id)}
                    className="admin-btn-eliminar"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdministradorAvisos;