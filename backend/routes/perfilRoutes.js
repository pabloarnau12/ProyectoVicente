const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authController");
const perfilController = require("../controllers/perfilController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware.verifyToken, authcontroller.getPerfil);

module.exports = router;
