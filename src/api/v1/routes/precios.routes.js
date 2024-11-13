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

//PATCH
router.patch('/:id', preciosController.patchPreciosItem);

//DELETE
router.delete('/:id', preciosController.deletePrecioItem);

export default router;

