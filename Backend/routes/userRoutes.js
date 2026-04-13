const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middlewares/roleAuth');
// Importa los controladores específicos en caso de existir
// const userController = require('../controllers/userController');

// Todas las rutas debajo de este middleware requerirán un token JWT válido
router.use(verifyToken);

// --- Rutas exclusivas para Tuctores ---
// Solo usuarios con rol 'tutor' pueden acceder
router.get('/mis-alumnos', requireRole(['tutor']), (req, res) => {
    // Lógica para obtener los alumnos del tutor
    res.status(200).json({ message: 'Lista de tutorados asignados', data: [] });
});

router.post('/registrar-asistencia', requireRole(['tutor']), (req, res) => {
    // Lógica para registrar asistencia
    res.status(200).json({ message: 'Asistencia registrada exitosamente' });
});

// --- Rutas exclusivas para Tutorados ---
// Solo usuarios con rol 'tutorado' pueden acceder
router.get('/mi-tutor', requireRole(['tutorado']), (req, res) => {
    // Lógica para que el estudiante vea a su tutor asignado
    res.status(200).json({ message: 'Información del tutor asignado', data: {} });
});

// --- Rutas Mixtas ---
// Tanto tutores como tutorados pueden acceder
router.get('/perfil', requireRole(['tutor', 'tutorado']), (req, res) => {
    // El ID y rol del usuario están disponibles en req.user
    res.status(200).json({
        message: 'Información de perfil obtenida',
        user: req.user
    });
});

module.exports = router;