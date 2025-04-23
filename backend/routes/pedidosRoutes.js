const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");
// Rutas para pedidos
router.get("/", pedidosController.getAllPedidos);
router.get("/estado", pedidosController.getPedidosByState);
router.get("/usuario/:id", pedidosController.getPedidosByUser);
router.get("/:id", pedidosController.getPedidosById);
router.get("/establecimiento/:id", pedidosController.getPedidosbyShop);
router.get(
  "/establecimiento/:id/estado",
  pedidosController.getPedidosByStateShop
);

// Rutas para acciones específicas
router.patch("/:id/aceptar", pedidosController.acceptOrder);
router.get("/asignado/:id", pedidosController.getPedidoAsignado);
router.patch("/:id/finalizar", pedidosController.finishOrder);
// router.patch("/:id/cancelar", pedidosController.cancelOrder);

module.exports = router;
