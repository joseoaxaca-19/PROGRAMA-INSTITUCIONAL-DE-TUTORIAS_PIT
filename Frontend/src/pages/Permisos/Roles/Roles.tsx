import React from 'react';
import { Search, Bell, Plus, ArrowRight, ShieldCheck, GraduationCap, Users, UserPlus } from 'lucide-react';
import './Roles.css';

const Roles: React.FC = () => {
  const roles = [
    { id: 1, titulo: 'Administrador', descripcion: 'Supervisión total de la infraestructura, gestión de usuarios de alto nivel y auditoría de logs.', permisos: ['Acceso Total', 'Gestión de API', 'Configuración Global'], icon: <ShieldCheck size={24} />, color: '#003DA6' },
    { id: 2, titulo: 'Tutor', descripcion: 'Supervisión de planes de estudio, asignación de tutores y validación de informes semestrales.', permisos: ['Gestión de Citas', 'Reportes de Área', 'Asignación Académica'], icon: <Users size={24} />, color: '#D6A600' },
    { id: 3, titulo: 'Tutorando', descripcion: 'Supervisión de planes de estudio, asignación de tutores y validación de informes semestrales.', permisos: ['Gestión de Citas', 'Reportes de Área', 'Asignación Académica'], icon: <UserPlus size={24} />, color: '#D6A600' },
    { id: 4, titulo: 'Estudiante', descripcion: 'Acceso a materiales, solicitud de citas, seguimiento de historial académico y descarga de constancias.', permisos: ['Mis Citas', 'Consulta de Reportes', 'Descarga de Archivos'], icon: <GraduationCap size={24} />, color: '#00897B' }
  ];

  return (
    <div className="roles-scroll-wrapper">
      <header className="roles-nav">
        <div className="nav-brand"> PIT FES ACATLÁN</div>
        <div className="nav-search-container">
          <Search size={25} className="search-icon" />
          <input type="text" placeholder="Buscar rol o permiso..." />
        </div>
        <div className="nav-actions">
          <Bell size={22} />
        </div>
      </header>

      <div className="roles-main-content">
        <div className="roles-top-bar">
          <div className="title-section">
            <span className="section-tag">ESTRUCTURA ORGANIZACIONAL</span>
            <h1>Roles del Sistema</h1>
            <p>Define y gestiona las jerarquías de acceso y responsabilidades operativas dentro de la plataforma académica.</p>
          </div>
          <button className="create-role-btn">
            <Plus size={20} /> Crear Nuevo Rol
          </button>
        </div>

        <div className="roles-cards-grid">
          {roles.map((role) => (
            <div key={role.id} className="premium-card">
              <div className="icon-box" style={{ backgroundColor: `${role.color}10`, color: role.color }}>
                {role.icon}
              </div>
              <h3>{role.titulo}</h3>
              <p className="role-text">{role.descripcion}</p>
              <div className="perm-container">
                <span className="perm-label">PERMISOS PRINCIPALES</span>
                {role.permisos.map((p, i) => (
                  <div key={i} className="perm-chip">{p}</div>
                ))}
              </div>
              <div className="card-action">
                <span>Configurar Rol</span>
                <ArrowRight size={18} />
              </div>
            </div>
          ))}

          <div className="premium-card dashed-card">
            <div className="plus-round"><Plus size={24} /></div>
            <h3>Nuevo Perfil de Acceso</h3>
            <p className="role-text">Crea una nueva estructura de permisos personalizada para necesidades específicas.</p>
          </div>
        </div>
        
        <footer className="roles-bottom-info">
          <div className="sys-status"><div className="green-dot"></div> Estado del Sistema: <strong>Operativo</strong></div>
          <div className="legal-links">
            <span>© 2024 PIT FES ACATLÁN - Universidad Nacional Autónoma de México</span>
            <a href="#">Términos de Uso</a>
            <a href="#">Aviso de Privacidad</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Roles;