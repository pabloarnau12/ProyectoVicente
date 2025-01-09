const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);
router.get('/tienda/:id', productosController.getProductosByTienda);
router.delete('/:ID_Producto/:ID_Establecimiento', productosController.deleteProductoByID);

module.exports = router;
