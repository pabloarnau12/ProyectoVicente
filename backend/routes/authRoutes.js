const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de que la ruta sea correcta
const { verifyToken } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/registro', authController.register);
router.post('/login', authController.login);
router.get('/perfil', verifyToken,authController.getPerfil);
router.patch('/perfil/direccion',verifyToken,authController.updateAddress);
router.patch('/perfil/status', verifyToken, authController.updateStatus);
router.patch('/perfil/horario', verifyToken, authController.updateHorario);
router.patch('/perfil/descripcion', verifyToken, authController.updateDescription);
module.exports = router;

