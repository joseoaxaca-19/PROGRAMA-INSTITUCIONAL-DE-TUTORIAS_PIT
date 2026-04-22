//Aqui va atrabajar Oscar

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PIT FES Acatlán - Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="wrapper">
        <header>
            <a href="#" class="logo-area">
                <div class="logo-placeholder"></div>
                PIT FES ACATLÁN
            </a>
            <nav>
                <ul>
                    <li><a href="https://google.com/inicio">Inicio</a></li>
                    <li><a href="https://google.com/tutorias">Tutorías</a></li>
                    <li><a href="https://google.com/recursos">Recursos</a></li>
                </ul>
            </nav>
            <div class="user-area">
                <a href="#" class="icon-bell">🔔</a>
                <div class="user-avatar">JD</div>
            </div>
        </header>

        <main>
            <section class="welcome-section">
                <h1>Bienvenido de nuevo</h1>
                <p>¿Listo para tu próxima sesión?</p>
            </section>

            <section class="section-title">
                📅 Tu próxima cita
            </section>
            <div class="next-session-card">
                <span class="status-badge">Sesión Próxima</span>
                <h2 class="session-subject">Cálculo II - Técnicas de Integración</h2>
                <div class="session-info-grid">
                    <div class="info-item">
                        <div class="info-icon-placeholder"></div>
                        PROFESOR/A: Profesor Jose
                    </div>
                    <div class="info-item">
                        <div class="info-icon-placeholder"></div>
                        FECHA Y HORA: Oct 24, 10:00 AM
                    </div>
                </div>
                <a href="https://google.com/unirse" class="btn-unirse">Unirse</a>
            </div>

            <div class="tutoring-header">
                <section class="section-title" style="margin-top: 0;">
                    🔍 Tutorías Disponibles
                </section>
                <div class="filter-group">
                    <select class="filter-select">
                        <option>Todas las materias</option>
                    </select>
                    <input type="date" class="date-picker" value="2026-10-25">
                </div>
            </div>

            <div class="tutoring-grid">
                <div class="tutoring-card">
                    <div class="card-header">
                        <div class="icon-subject-placeholder icon-symbol">&lt; &gt;</div>
                        <span class="availability-badge status-open">ABIERTO</span>
                    </div>
                    <div class="card-body">
                        <h3>Python</h3>
                        <p>Profesora Lupe</p>
                    </div>
                    <div class="card-details">
                        <span>📅 Oct 25, 2026</span>
                        <span>⏰ 12:00 PM - 02:00 PM</span>
                    </div>
                    <a href="https://google.com/python" class="btn-inscribirse">Inscribirse</a>
                </div>

                <div class="tutoring-card">
                    <div class="card-header">
                        <div class="icon-subject-placeholder icon-symbol">⚡</div>
                        <span class="availability-badge status-open">ABIERTO</span>
                    </div>
                    <div class="card-body">
                        <h3>Derecho</h3>
                        <p>Profesora Sandra</p>
                    </div>
                    <div class="card-details">
                        <span>📅 Oct 26, 2026</span>
                        <span>⏰ 09:00 AM - 11:00 AM</span>
                    </div>
                    <a href="https://google.com/derecho" class="btn-inscribirse">Inscribirse</a>
                </div>

                <div class="tutoring-card">
                    <div class="card-header">
                        <div class="icon-subject-placeholder icon-symbol">Σ</div>
                        <span class="availability-badge status-full">LLENO</span>
                    </div>
                    <div class="card-body">
                        <h3>Álgebra Lineal</h3>
                        <p>Profesor Mario</p>
                    </div>
                    <div class="card-details">
                        <span>📅 Oct 27, 2026</span>
                        <span>⏰ 04:00 PM - 06:00 PM</span>
                    </div>
                    <a href="#" class="btn-inscribirse btn-lista-espera">Unirse a la lista de espera</a>
                </div>
            </div>
        </main>

        <footer>
            <div class="footer-logo-area">
                <div class="logo-placeholder" style="background-color: #A0AEC0;"></div>
                PIT FES ACATLÁN
            </div>
            <nav class="footer-nav">
                <ul>
                    <li><a href="/privacidad">Política de Privacidad</a></li>
                    <li><a href="/terminos">Términos de Servicio</a></li>
                    <li><a href="/soporte">Soporte Técnico</a></li>
                </ul>
            </nav>
            <div class="copy-notice">
                © 2026 PIT FES ACATLÁN. Todos los derechos reservados.
            </div>
        </footer>
    </div>

</body>
</html>
