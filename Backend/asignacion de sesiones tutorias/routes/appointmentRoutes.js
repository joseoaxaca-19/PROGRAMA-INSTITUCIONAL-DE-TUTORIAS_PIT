const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

// Ruta para que el tutor proponga una cita
router.post('/', appointmentController.proposeAppointment);

// Ruta para que el tutorado acepte o rechace la cita
router.patch('/:id/status', appointmentController.updateStatus);

// Ruta para ver todas las citas
router.get('/', appointmentController.getAllAppointments);

module.exports = router;
