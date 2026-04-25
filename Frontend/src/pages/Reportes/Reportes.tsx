import React from "react";
import "./Reportes.css";

import Sidebar from "../../components/Sidebar/Sidebar";


// Material UI Icons
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";

const Reportes: React.FC = () => {

  return (

    <div className="reportes-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO */}
      <div className="reportes-main">

        {/* TOPBAR */}
        <div className="topbar">

          <h2 className="logo">
            ACATLÁN ACADEMIC
          </h2>

          <div className="topbar-right">

            <input
              type="text"
              placeholder="Buscar reporte..."
              className="search-input"
            />

            <NotificationsNoneIcon className="icon" />
            <SettingsIcon className="icon" />

            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="avatar"
            />

          </div>

        </div>

        {/* CONTENIDO */}
        <div className="reportes-container">

          {/* HEADER */}
          <div className="reportes-header">

            <div>

              <p className="panel-label">
                PANEL DE CONTROL
              </p>

              <h1 className="title">
                Reportes e Historial
              </h1>

              <p className="subtitle">
                Visualiza el rendimiento académico,
                las tendencias de asesorías y el
                registro histórico detallado.
              </p>

            </div>

            <button className="btn-excel">

              <DownloadIcon />

              Descargar Excel

            </button>

          </div>

          {/* CARDS */}
          <div className="cards-row">

            <div className="card">
              <p className="card-title">
                Total de Tutorías
              </p>

              <h2>1,284</h2>

              <span className="positive">
                + 12.5% este mes
              </span>
            </div>

            <div className="card">
              <p className="card-title">
                Alumnos Atendidos
              </p>

              <h2>856</h2>

              <span className="positive">
                + 8.2% incremento anual
              </span>
            </div>

            <div className="card highlight">
              <p className="card-title">
                Materia más Solicitada
              </p>

              <h3>
                Cálculo Diferencial e Integral
              </h3>

              <span>
                245 sesiones registradas
              </span>
            </div>

          </div>

          {/* GRAFICAS */}
          <div className="charts-row">

            {/* Tendencias */}
            <div className="chart-card">

              <div className="chart-header">

                <h3>
                  Tendencias de Tutorías
                </h3>

                <select>
                  <option>Últimos 30 días</option>
                  <option>Últimos 7 días</option>
                </select>

              </div>

              <div className="chart-placeholder">

                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
                <div className="bar bar3 active"></div>
                <div className="bar bar4"></div>
                <div className="bar bar5"></div>

              </div>

            </div>

            {/* DISTRIBUCIÓN ESTÁTICA */}
            <div className="chart-card small">

              <h3 className="distribution-title">
                Distribución por División
              </h3>

              <p className="distribution-subtitle">
                Participación académica
              </p>

              <div className="pie-chart">

                <div className="pie-inner">
                  <span className="pie-percent">
                    64%
                  </span>
                </div>

              </div>

              <ul className="legend">

                <li>
                  <div className="legend-left">

                    <span className="dot blue"></span>

                    Ciencias Sociales

                  </div>

                  <span className="legend-percent">
                    64%
                  </span>

                </li>

                <li>
                  <div className="legend-left">

                    <span className="dot yellow"></span>

                    Humanidades

                  </div>

                  <span className="legend-percent">
                    22%
                  </span>

                </li>

                <li>
                  <div className="legend-left">

                    <span className="dot gray"></span>

                    Matemáticas e Ing.

                  </div>

                  <span className="legend-percent">
                    14%
                  </span>

                </li>

              </ul>

            </div>

          </div>

          {/* TABLA */}
          <div className="table-card">

            <div className="table-header">

              <h3>
                Historial Detallado
              </h3>

              <div className="table-icons">

                <FilterListIcon />
                <MoreVertIcon />

              </div>

            </div>

            <table>

              <thead>

                <tr>

                  <th>DÍA</th>
                  <th>SALÓN</th>
                  <th>INSCRITOS</th>
                  <th>TUTOR</th>
                  <th>MATERIA</th>
                  <th>NOTAS</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>12 Oct 2025</td>
                  <td>A-304</td>
                  <td>15</td>
                  <td>Dr. Jorge Silva</td>

                  <td>
                    <span className="badge blue">
                      Matemáticas
                    </span>
                  </td>

                  <td>
                    Sesión enfocada en derivadas complejas.
                  </td>

                </tr>

                <tr>

                  <td>11 Oct 2025</td>
                  <td>B-102</td>
                  <td>08</td>
                  <td>Mtra. Elena Ruiz</td>

                  <td>
                    <span className="badge yellow">
                      Derecho
                    </span>
                  </td>

                  <td>
                    Análisis de casos constitucionales.
                  </td>

                </tr>

                <tr>

                  <td>10 Oct 2025</td>
                  <td>C-211</td>
                  <td>22</td>
                  <td>Lic. Arturo Gómez</td>

                  <td>
                    <span className="badge gray">
                      Economía
                    </span>
                  </td>

                  <td>
                    Macroeconomía: Inflación y PIB.
                  </td>

                </tr>

              </tbody>

            </table>

            <div className="pagination">

              <button className="btn-secondary">
                Anterior
              </button>

              <button className="btn-primary">
                Siguiente
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Reportes;