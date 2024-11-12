import { Router } from 'express';
import * as prodPreciosController from '../controllers/prodPrecios.controller.js';

const router = Router();
// Rutas para manejar precios en listas de productos
router.delete('/listas-precios/:id/precios/:idPrecios', prodPreciosController.eliminarPrecioDeLista);

export default router;