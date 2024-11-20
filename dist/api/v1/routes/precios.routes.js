"use strict";

// routes/precio.routes.js
var _require = require('express'),
  Router = _require.Router;
var precioController = require('../controllers/precios.controller');
var router = Router();

// Ruta para obtener todos los precios
router.get('/', precioController.getAllPrecios);

// Ruta para obtener los precios por IdListaOK
router.get('/:idListaOK', precioController.getPreciosByIdListaOK);
module.exports = router;