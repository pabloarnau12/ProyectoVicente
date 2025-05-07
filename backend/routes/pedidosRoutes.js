const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");

router.get("/", pedidosController.getAllPedidos);
router.get("/estado", pedidosController.getPedidosByState);
router.get("/usuario/:id", pedidosController.getPedidosByUserAndState);
router.get("/:id", pedidosController.getPedidosById);
router.get("/establecimiento/:id", pedidosController.getPedidosbyShop);
router.get(
  "/establecimiento/:id/estado",
  pedidosController.getPedidosByStateShop
);

router.patch("/:id/aceptar", pedidosController.acceptOrder);
router.get("/asignado/:id", pedidosController.getPedidoAsignado);
router.patch("/:id/finalizar", pedidosController.finishOrder);
router.patch("/:id/estado", pedidosController.updateOrderStatus);
// router.patch("/:id/cancelar", pedidosController.cancelOrder);

module.exports = router;
