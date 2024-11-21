const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

// Rutas para pagos
router.post('/', paymentsController.createPayment);
router.get('/success', paymentsController.paymentSuccess);
router.get('/cancel', paymentsController.paymentCancel);

module.exports = router;