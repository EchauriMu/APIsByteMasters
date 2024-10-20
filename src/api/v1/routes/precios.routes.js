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
//POST ALERTA ITEM
router.post('/:id/alertas', preciosController.postAlertaItem);
//POST ALERTAS LISTA
router.post('/:id/alertas-lista', preciosController.postAlertasList);
//PUT ALERTA ITEM
router.put('/:id/alertas/:alertaId', preciosController.putAlertasItem);

export default router;

