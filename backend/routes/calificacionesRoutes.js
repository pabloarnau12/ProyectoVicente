const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/calificacionesController');

// Rutas de calificaciones
router.get('/establecimientos', calificacionesController.getAllCalificacionesEstablecimientos); // Obtener todas las calificaciones de todos los establecimientos
router.get('/establecimientos/promedio/:id', calificacionesController.getCalificacionPromedioEstablecimientos); // Obtener la calificación promedio de una tienda (solo devuelve un numero)
router.get('/establecimientos/:id', calificacionesController.getAllCalificacionesEstablecimientosbyID) // obtener todas las calificaciones de UN Establecimientoos
router.post('/establecimientos/add', calificacionesController.addComentarioEstablecimiento) //para añadir un comentario a una tienda
module.exports = router;
