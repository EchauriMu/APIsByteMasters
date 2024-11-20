// prodPrecios.routes.js

import express from 'express';
import * as prodPreciosController from '../controllers/prodPrecios.controller.js';

const router = express.Router();


router.get('/:id/precios', prodPreciosController.getPreciosByLista);
router.post('/:id/precios', prodPreciosController.postPrecioToLista);
router.put('/:id/precios/:idPrecios', prodPreciosController.putPrecioInLista);



export default router;
