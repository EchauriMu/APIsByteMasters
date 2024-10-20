//Commerce
import { Router } from 'express';
import * as preciosController from '../controllers/precios.controller';
const router = Router();
//para toda la lista
router.get('/', preciosController.getPreciosList);
// para solo un id
router.get('/:id', preciosController.getPrecioItem);

//POST
router.post('/', preciosController.postPreciosItem);

//PUT
router.put('/:id', preciosController.putPreciosItem);

//DELETE
router.delete('/:id', preciosController.deletePrecioItem);

//------------------ A L E R T A S --------------------
//GET ALERTAS
router.get('/:id/alertas', preciosController.getAlertasByListaId);

export default router;

