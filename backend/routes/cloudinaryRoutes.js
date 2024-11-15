const express = require('express');
const router = express.Router();
const upload = require('../middleware/cloudinaryMiddleware'); // Middleware configurado
const authMiddleware = require('../middleware/authMiddleware')
const cloudinaryController = require('../controllers/cloudinaryController'); // Controlador

router.post('/', authMiddleware.verifyToken, upload.single('image'), cloudinaryController.uploadImage);

module.exports = router;
