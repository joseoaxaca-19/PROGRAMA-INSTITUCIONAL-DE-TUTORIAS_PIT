const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/appointments', appointmentRoutes);

// Sincronizar Base de Datos y Levantar Servidor
sequelize.sync()
  .then(() => {
    console.log('Base de datos conectada (SQLite)');
    app.listen(PORT, () => {
      console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
