import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import Sidebar from "../../components/Sidebar/Sidebar";

const Agenda: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserName(user.nombre || user.email?.split('@')[0] || 'Usuario');
      setUserRole(user.role || '');
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar userRole={userRole} />
      <Box sx={{ flexGrow: 1, p: 3, ml: '200px', mt: 8 }}>
        <Container>
          <Typography variant="h4">Agenda de Tutorías</Typography>
          <Typography variant="body1">Bienvenido, {userName}</Typography>
          <Typography variant="body2">Rol: {userRole}</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Agenda;