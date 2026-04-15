//Aqui va atrabajar Oscar
import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, Card, 
  CardContent, Box, Avatar, IconButton, Badge, Chip, Select, MenuItem, FormControl 
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Agenda.css';

// Configuración del Tema con tus especificaciones
const theme = createTheme({
  palette: {
    primary: { main: '#003DA5' },   // Azul solicitado
    secondary: { main: '#D6A600' }, // Dorado solicitado
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
      <Box className="agenda-container">
        
        {/* Navbar idéntica a la imagen */}
        <AppBar position="static" color="transparent" elevation={0} className="navbar">
          <Toolbar className="toolbar-content">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box className="brand-logo" />
              <Typography variant="h6" color="primary">PIT FES ACATLÁN</Typography>
            </Box>
            <Box className="nav-menu">
              <Button>Inicio</Button>
              <Button>Tutorías</Button>
              <Button>Recursos</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton><Badge badgeContent={1} color="error"><NotificationsNoneIcon /></Badge></IconButton>
              <Avatar className="profile-avatar">JD</Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 6 }}>
          {/* Encabezado */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" color="textSecondary">Bienvenido de nuevo</Typography>
            <Typography variant="body1" color="textSecondary">¿Listo para tu próxima sesión?</Typography>
          </Box>

          {/* Card de Próxima Cita */}
          <Typography variant="subtitle1" className="section-label">
            <CalendarTodayIcon fontSize="small" color="primary" /> Tu próxima cita
          </Typography>
          <Card className="highlight-card">
            <CardContent sx={{ p: 4 }}>
              <Typography variant="caption" className="next-badge">SESIÓN PRÓXIMA</Typography>
              <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>Cálculo II - Técnicas de Integración</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>PROFESOR/A:</strong> Profesor Jose</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>FECHA Y HORA:</strong> Oct 24, 10:00 AM</Typography>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" className="btn-join">Unirse</Button>
            </CardContent>
          </Card>

          {/* Filtros */}
          <Box className="filter-section">
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchIcon color="primary" /> Tutorías Disponibles
            </Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select displayEmpty defaultValue="">
                <MenuItem value="">Todas las materias</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Grid de Tutorías */}
          <Grid container spacing={3} sx={{ pb: 8 }}>
            {tutorias.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card className="tutoria-card">
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box className="icon-box">{item.icon}</Box>
                      <Chip 
                        label={item.status} 
                        size="small" 
                        className={`status-label ${item.status.toLowerCase()}`} 
                      />
                    </Box>
                    <Typography variant="h6">{item.materia}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>{item.prof}</Typography>
                    <Typography variant="body2" color="textSecondary">📅 {item.fecha}</Typography>
                    <Typography variant="body2" color="textSecondary">⏰ {item.hora}</Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button 
                      fullWidth 
                      className={`btn-card-action ${item.status === 'LLENO' ? 'disabled' : ''}`}
                      disabled={item.status === 'LLENO'}
                    >
                      {item.status === 'LLENO' ? 'Unirse a la lista de espera' : 'Inscribirse'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Agenda;
