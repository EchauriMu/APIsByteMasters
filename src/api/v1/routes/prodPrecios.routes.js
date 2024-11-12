// prodPrecios.routes.js

import express from 'express';
import * as prodPreciosController from '../controllers/prodPrecios.controller.js';

const router = express.Router();

// Rutas para manejar precios en listas de productos
router.get('/:id/precios', prodPreciosController.getPreciosByLista);
router.post('/:id/precios', prodPreciosController.postPrecioToLista);
router.put('/:id/precios/:idPrecios', prodPreciosController.putPrecioInLista);

router.delete(':id/precios/:idPrecios', prodPreciosController.eliminarPrecio);

export default router;
