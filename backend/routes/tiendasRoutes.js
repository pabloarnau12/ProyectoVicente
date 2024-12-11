const express = require('express');
const router = express.Router();
const tiendasController = require('../controllers/tiendasController');

// Rutas de tiendas
router.get('/', tiendasController.getAllTiendas); // Obtener todas las tiendas
router.get('/mejorvaloradas/:limit', tiendasController.getTiendasByCalificacion) //obtener tiendas segun la valoracion, el numero de resultados hay que pasarselo en la URL
router.get('/:id', tiendasController.getTiendaById); // Obtener tienda por ID
router.get('/:id/productos', tiendasController.getProductosByTienda); // Obtener productos por tienda
router.get('/:id/productos/:idProducto', tiendasController.getProductoByTiendaAndProductoId); // Obtener producto específico por tienda

module.exports = router;
