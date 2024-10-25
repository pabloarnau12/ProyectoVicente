const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.getAllPedidos);
router.get('/:id', pedidosController.getPedidosById);
router.get('/usuario/:id', pedidosController.getPedidosByUser);

module.exports = router;
