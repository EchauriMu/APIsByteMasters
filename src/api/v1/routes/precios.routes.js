import { Router } from 'express';
import * as preciosController from '../controllers/precios.controller'; // Importación correcta
const router = Router();

// Rutas CRUD para los precios
router.get('/', preciosController.getPreciosList);
router.get('/:id', preciosController.getPrecioItem);
router.post('/', preciosController.postPreciosItem);
router.put('/:id', preciosController.putPreciosItem);
router.delete('/:id', preciosController.deletePrecioItem);

// Referencia correcta a deleteListaPrecios
router.delete('/listas-precios/:id', preciosController.deleteListaPrecios);

// Ruta DELETE para eliminar una promoción de una lista específica
router.delete('/listas-precios/:id/promociones/:idPromocion', preciosController.deletePromocion);

export default router;
