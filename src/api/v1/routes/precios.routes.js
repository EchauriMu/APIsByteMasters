import { Router } from 'express';
import * as preciosController from '../controllers/precios.controller'; // Importación correcta
const router = Router();

// Rutas CRUD para los precios


router.delete('/listas-precios/:id/precios/:idProdServ', preciosController.eliminarPrecio);

// Referencia correcta a deleteListaPrecios
router.delete('/listas-precios/:id', preciosController.deleteListaPrecios);

// Ruta DELETE para eliminar una promoción de una lista específica
router.delete('/listas-precios/:id/promociones/:idPromocion', preciosController.deletePromocion);

router.delete('/listas-precios/:id/alertas/:idAlerta', preciosController.eliminarAlerta);

export default router;
