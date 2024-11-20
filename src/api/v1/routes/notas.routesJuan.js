import { Router } from 'express';
import * as notasController from '../controllers/notas.controllerJuan';
const router = Router();

//GET NOTAS
router.get('/:id/notas', notasController.getNotas);
//POST NOTA ITEM
router.post('/:id/notas', notasController.postNotaItem);
//POST NOTAS LISTA
router.post('/:id/notas-lista', notasController.postNotasList);
//PUT NOTA ITEM
router.put('/:id/notas/:notaId', notasController.putNotaItem);

export default router;
