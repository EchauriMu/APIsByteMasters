import express from 'express';
import * as historialController from '../controllers/historial.controller.js';

const router = express.Router();

router.get('/:IdProdServOK/historial', historialController.getFullHistorialByLista);
router.get('/:IdProdServOK/historial/:IdPresentaOK', historialController.getHistorialByIdProdServ);
router.get('/:IdProdServOK/historial/:IdPresentaOK/:ID', historialController.getHistorialproductoregistro);
router.post('/:IdProdServOK/historial/', historialController.addHistorialObj);
router.post('/:IdProdServOK/historial/:IdPresentaOK', historialController.addHistorialEntry);
router.delete('/:IdProdServOK/historial/:IdPresentaOK', historialController.deleteHistorialByIdProdServ);
router.delete('/:IdProdServOK/historial/:IdPresentaOK/:ID', historialController.deletehistorialproductoregistro);
router.put('/:IdProdServOK/historial/:IdPresentaOK/:ID', historialController.updateHistorialProductoregistro);

export default router;