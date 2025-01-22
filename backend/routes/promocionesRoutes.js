const express = require('express');
const router = express.Router();
const promocionesController = require('../controllers/promocionesController');

// Ruta para añadir una nueva promoción
router.post('/', promocionesController.addPromotion);
router.delete('/:id', promocionesController.deletePromotion);
router.patch('/estado/:id', promocionesController.updatePromotionState);
// router.get('/', promocionesController.getAllPromotions);
router.get('/shop/:id', promocionesController.getPromotionsByShop);


module.exports = router;