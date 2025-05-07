const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

router.post("/", paymentsController.createPayment);
router.get("/success", paymentsController.paymentSuccess);
router.get("/cancel", paymentsController.paymentCancel);

module.exports = router;
