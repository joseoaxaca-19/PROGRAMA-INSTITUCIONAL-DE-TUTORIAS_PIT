import React from 'react';
import { useParams } from 'react-router-dom';

const RepositorioCarrera: React.FC = () => {
  const { carrera } = useParams<{ carrera: string }>();

  return (
    <div>
      <h1>Repositorio para la carrera: {carrera}</h1>
      {/* Add your component logic here, e.g., fetch and display repository data filtered by carrera */}
    </div>
  );
};

export default RepositorioCarrera;