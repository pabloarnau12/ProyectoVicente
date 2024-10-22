const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/calificacionesController');

// Rutas de calificaciones
router.get('/', calificacionesController.getAllCalificaciones); // Obtener todas las calificaciones
router.get('/:id', calificacionesController.getCalificacionPromedio); // Obtener la calificación promedio de una tienda

module.exports = router;
