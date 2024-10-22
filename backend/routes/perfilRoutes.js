const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas (necesitan token JWT)
router.get('/', authMiddleware.verifyToken, perfilController.getPerfil);  // Obtener el perfil del usuario autenticado

module.exports = router;
