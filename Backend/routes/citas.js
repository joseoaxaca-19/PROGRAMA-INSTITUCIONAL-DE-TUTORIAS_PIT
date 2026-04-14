const express = require('express');
const router = express.Router();
const controller = require('../controllers/citasController');

router.get('/disponibles', controller.obtenerCitasDisponibles);
router.post('/seleccionar', controller.seleccionarCita);

module.exports = router;