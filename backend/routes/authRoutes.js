const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registro', authController.register);
router.post('/login', authController.login);
router.post('/perfil', authController.getPerfil)
module.exports = router;
