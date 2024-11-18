const { Router } = require('express');
const precioController = require('../controllers/precios.controllerMiguel');
const router = Router();

// Ruta para crear un precio en la lista de precios
router.post('/:idListaOK', precioController.postPrecio);
router.put('/:idListaOK', precioController.putPrecio);
router.delete('/:idListaOK/precio/:IdPresentaOK', precioController.deletePrecio);

module.exports = router;