const express = require('express');
const router = express.Router();
const favoriteshopsController = require('../controllers/favoriteshopsController'); // Asegúrate de que la ruta sea correcta

router.get('/check', favoriteshopsController.checkFavoriteShop);
router.get('/', favoriteshopsController.getFavoriteShops);
router.get('/:id', favoriteshopsController.getFavoriteShopsbyUser);
router.post('/', favoriteshopsController.addFavoriteShop);
router.delete('/', favoriteshopsController.removeFavoriteShop);




module.exports = router;
