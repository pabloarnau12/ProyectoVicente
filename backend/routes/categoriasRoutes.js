const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

router.get('/establecimientos', categoriasController.getAllCategoriasEstablecimientos)

module.exports = router;



