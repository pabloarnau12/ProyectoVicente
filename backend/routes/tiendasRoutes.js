const express = require("express");
const router = express.Router();
const tiendasController = require("../controllers/tiendasController");

router.get("/", tiendasController.getAllTiendas);
router.get(
  "/mejorvaloradas/:limit",
  tiendasController.getTiendasByCalificacion
);
router.get("/:id", tiendasController.getTiendaById);
router.get("/:id/productos", tiendasController.getProductosByTienda);
router.get(
  "/:id/productos/:idProducto",
  tiendasController.getProductoByTiendaAndProductoId
);
router.get("/admin/:id", tiendasController.getTiendaByAdmin);
router.get("/paginacion/:page/:limit", tiendasController.getTiendasByPage);
module.exports = router;
