const express = require("express");
const router = express.Router();
const calificacionesController = require("../controllers/calificacionesController");

router.get(
  "/establecimientos",
  calificacionesController.getAllCalificacionesEstablecimientos
);
router.get(
  "/establecimientos/promedio/:id",
  calificacionesController.getCalificacionPromedioEstablecimientos
);
router.get(
  "/establecimientos/:id",
  calificacionesController.getAllCalificacionesEstablecimientosbyID
);
router.post(
  "/establecimientos/add",
  calificacionesController.addComentarioEstablecimiento
);
module.exports = router;
