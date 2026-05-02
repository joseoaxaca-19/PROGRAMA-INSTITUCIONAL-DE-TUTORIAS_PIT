const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { verifyToken, requireRole } = require('../middlewares/roleAuth');

// El controlador revisa también internamente el rol, pero añadimos el middleware para mayor seguridad
router.post('/create', verifyToken, appointmentController.createAppointment);
router.post('/', verifyToken, appointmentController.createAppointment); // Alias REST puro
router.patch('/:id/estado', verifyToken, appointmentController.updateStatus);

module.exports = router;
