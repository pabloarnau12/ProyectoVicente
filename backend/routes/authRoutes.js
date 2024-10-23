const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de que la ruta sea correcta
const { verifyToken } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/registro', authController.register);
router.post('/login', authController.login);
router.get('/perfil', verifyToken,authController.getPerfil)
module.exports = router;
