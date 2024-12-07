const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/calificacionesController');

// Rutas de calificaciones
router.get('/establecimientos', calificacionesController.getAllCalificacionesEstablecimientos); // Obtener todas las calificaciones
router.get('/establecimientos/promedio/:id', calificacionesController.getCalificacionPromedioEstablecimientos); // Obtener la calificación promedio de una tienda
router.get('/establecimientos/:id', calificacionesController.getAllCalificacionesEstablecimientosbyID)
module.exports = router;
