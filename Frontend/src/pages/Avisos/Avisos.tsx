import { useState, useEffect } from 'react';

const Avisos = () => {
  const [avisos, setAvisos] = useState<any[]>([]);

  useEffect(() => {
    const avisosGuardados = localStorage.getItem('avisos');
    if (avisosGuardados) {
      setAvisos(JSON.parse(avisosGuardados));
    }
  }, []);

  if (avisos.length === 0) {
    return (
      <div>
        <h1>Programa de Tutorías</h1>
        <p>Impulsando tu éxito académico</p>
        <a href="/servicios">Comencemos</a>
        <a href="/sobre-nosotros">Ver más info</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Programa de Tutorías</h1>
      <p>Impulsando tu éxito académico</p>
      <a href="/servicios">Comencemos</a>
      <a href="/sobre-nosotros">Ver más info</a>
      <hr />
      <h2>Avisos</h2>
      {avisos.map((aviso) => (
        <div key={aviso.id} style={{ background: aviso.color, padding: 20 }}>
          <h3>{aviso.titulo}</h3>
          <p>{aviso.contenido}</p>
          {aviso.enlace && <a href={aviso.enlace}>Ver más</a>}
        </div>
      ))}
    </div>
  );
};

export default Avisos;