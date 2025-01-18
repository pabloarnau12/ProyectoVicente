const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.getAllPedidos);
router.get('/estado', pedidosController.getPedidosByState);
router.get('/usuario/:id', pedidosController.getPedidosByUser);
router.get('/:id', pedidosController.getPedidosById);
router.get('/establecimiento/:id', pedidosController.getPedidosbyShop);


module.exports = router;

