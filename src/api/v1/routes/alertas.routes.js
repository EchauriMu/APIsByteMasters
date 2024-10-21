//Commerce
import { Router } from 'express';
import * as preciosController from '../controllers/alertas.controller';
const router = Router();

//GET ALERTAS
router.get('/:id/alertas', preciosController.getAlertas);
//POST ALERTA ITEM
router.post('/:id/alertas', preciosController.postAlertaItem);
//POST ALERTAS LISTA
router.post('/:id/alertas-lista', preciosController.postAlertasList);
//PUT ALERTA ITEM
router.put('/:id/alertas/:alertaId', preciosController.putAlertasItem);

export default router;

