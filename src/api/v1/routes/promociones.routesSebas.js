// src/api/v1/routes/promociones.routes.js

const express = require('express');
const promocionesController = require('../controllers/promociones.controllerSebas');
const router = express.Router();

// Rutas de promociones
router.get('/:id/promociones', promocionesController.getPromociones); // GET usando IdListaOK
router.post('/:id/promociones', promocionesController.postPromocion); // POST usando IdListaOK
router.put('/:id/promociones/:idPromocion', promocionesController.putPromocion); // PUT usando IdListaOK y id de la promoción


module.exports = router;
