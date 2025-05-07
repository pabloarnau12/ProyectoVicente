const express = require("express");
const router = express.Router();
const upload = require("../middleware/cloudinaryMiddleware");
const productosController = require("../controllers/productosController");

router.get("/", productosController.getAllProductos);
router.get("/:id", productosController.getProductoById);
router.get("/tienda/:id", productosController.getProductosByTienda);
router.delete(
  "/:ID_Producto/:ID_Establecimiento",
  productosController.deleteProductoByID
);
router.post(
  "/",
  upload("products").single("image"),
  productosController.addProducto
);
router.put("/:id", productosController.updateProducto);
module.exports = router;
