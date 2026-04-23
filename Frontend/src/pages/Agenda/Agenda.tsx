import React from 'react';
import { 
  Container, Card, CardContent, Box, Chip, Select, MenuItem, FormControl, Typography 
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from "../../components/Sidebar/Sidebar";
import './Agenda.css';

const theme = createTheme({
  palette: {
    primary: { main: '#003DA5' },
    secondary: { main: '#D6A600' },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h4: { fontFamily: '"Lexend", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Lexend", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
});

const Agenda: React.FC = () => {
  const tutorias = [
    { id: 1, materia: 'Python', prof: 'Profesora Lupe', status: 'ABIERTO', fecha: 'Oct 25, 2026', hora: '12:00 PM - 02:00 PM', icon: '</>' },
    { id: 2, materia: 'Derecho', prof: 'Profesora Sandra', status: 'ABIERTO', fecha: 'Oct 26, 2026', hora: '09:00 AM - 11:00 AM', icon: '⚡' },
    { id: 3, materia: 'Álgebra Lineal', prof: 'Profesor Mario', status: 'LLENO', fecha: 'Oct 27, 2026', hora: '04:00 PM - 06:00 PM', icon: 'Σ' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="agenda-layout">
        <Sidebar />
        
        {/* Contenido principal */}
        <main className="agenda-main">
          {/* Topbar */}
          <header className="agenda-topbar">
            <span className="agenda-breadcrumb">Panel › Agenda</span>
            <div className="agenda-topbar-right">
              <span className="agenda-topbar-bell">🔔</span>
              <div className="agenda-topbar-user">
                <div>
                  <p className="agenda-topbar-name">Admin Usuario</p>
                  <p className="agenda-topbar-role">COORDINADOR</p>
                </div>
                <div className="agenda-topbar-avatar">AU</div>
              </div>
            </div>
          </header>

          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" color="textSecondary">Bienvenido de nuevo</Typography>
              <Typography variant="body1" color="textSecondary">¿Listo para tu próxima sesión?</Typography>
            </Box>

            <Typography variant="subtitle1" className="section-label" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarTodayIcon fontSize="small" color="primary" /> Tu próxima cita
            </Typography>
            
            {/* Cita próxima */}
            <Card className="highlight-card" sx={{ mb: 6 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="caption" className="next-badge">SESIÓN PRÓXIMA</Typography>
                <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>Cálculo II - Técnicas de Integración</Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  gap: 2, 
                  mb: 3 
                }}>
                  <Typography variant="body2"><strong>PROFESOR/A:</strong> Profesor Jose</Typography>
                  <Typography variant="body2"><strong>FECHA Y HORA:</strong> Oct 24, 10:00 AM</Typography>
                </Box>
                
                <button className="agenda-btn-join">Unirse</button>
              </CardContent>
            </Card>

            <Box className="filter-section" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon color="primary" /> Tutorías Disponibles
              </Typography>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select displayEmpty defaultValue="">
                  <MenuItem value="">Todas las materias</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Grid de tutorías */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr'
              },
              gap: 3, 
              pb: 8 
            }}>
              {tutorias.map((item) => (
                <Card key={item.id} className="agenda-tutoria-card" sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box className="agenda-icon-box">{item.icon}</Box>
                      <Chip 
                        label={item.status} 
                        size="small" 
                        sx={{ 
                          fontWeight: 'bold',
                          backgroundColor: item.status === 'LLENO' ? '#ffebee' : '#e8f5e9',
                          color: item.status === 'LLENO' ? '#c62828' : '#2e7d32'
                        }} 
                      />
                    </Box>
                    <Typography variant="h6">{item.materia}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>{item.prof}</Typography>
                    <Typography variant="body2" color="textSecondary">📅 {item.fecha}</Typography>
                    <Typography variant="body2" color="textSecondary">⏰ {item.hora}</Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <button 
                      className={`agenda-btn-inscribir ${item.status === 'LLENO' ? 'disabled' : ''}`}
                      disabled={item.status === 'LLENO'}
                    >
                      {item.status === 'LLENO' ? 'Lista de espera' : 'Inscribirse'}
                    </button>
                  </Box>
                </Card>
              ))}
            </Box>
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
};

export default Agenda;