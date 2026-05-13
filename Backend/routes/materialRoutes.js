const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const { verifyToken, requireRole } = require('../middlewares/roleAuth');

// Rutas publicas
router.get('/', materialController.obtenerMateriales);
router.get('/categoria/:categoria', materialController.obtenerMaterialesPorCategoria);
router.get('/carrera/:carrera', materialController.obtenerMaterialesPorCarrera);
router.get('/categorias', materialController.obtenerCategorias);

// Rutas protegidas (solo admin)
router.post('/', verifyToken, requireRole(['admin']), materialController.crearMaterial);
router.put('/:id', verifyToken, requireRole(['admin']), materialController.actualizarMaterial);
router.delete('/:id', verifyToken, requireRole(['admin']), materialController.eliminarMaterial);

module.exports = router;