const express = require('express');
const router = express.Router();
const favoriteshopsController = require('../controllers/favoriteshopsController'); // Asegúrate de que la ruta sea correcta


router.get('/', favoriteshopsController.getFavoriteShops);
router.get('/:id', favoriteshopsController.getFavoriteShopsbyUser);


module.exports = router;
