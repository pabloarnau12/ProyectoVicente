const express = require('express');
const router = express.Router();
const upload = require('../middleware/cloudinaryMiddleware'); // Middleware configurado
const authMiddleware = require('../middleware/authMiddleware')
const cloudinaryController = require('../controllers/cloudinaryController'); // Controlador

router.post('/profile_picture', authMiddleware.verifyToken, upload('profile_pictures').single('image'), cloudinaryController.uploadProfileImage);
router.post('/product_picture', authMiddleware.verifyToken, upload('products').single('image'), cloudinaryController.uploadProductImage);



module.exports = router;
