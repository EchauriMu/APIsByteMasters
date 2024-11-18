// routes/precio.routes.js
const { Router } = require('express');
const precioController = require('../controllers/precios.controllerEduardo');
const router = Router();

// Ruta para obtener todos los precios
router.get('/', precioController.getAllPrecios);

// Ruta para obtener los precios por IdListaOK
router.get('/:idListaOK', precioController.getPreciosByIdListaOK);

//ruta deletar
// Ruta para eliminar una lista de precios por idListaOK
router.delete('/:idListaOK', precioController.deleteListaPrecios);

//crear llista completa nueva
// Ruta para crear lista de precios
router.post('/crear', precioController.createListaPrecios);


module.exports = router;
