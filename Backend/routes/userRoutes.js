const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/roleAuth');
const { getPerfil, updatePerfil } = require('../controllers/authController');

// Todas las rutas requieren autenticación
router.use(verifyToken);

router.get('/perfil', getPerfil);
router.put('/perfil', updatePerfil);

module.exports = router;