//Commerce
import { Router } from 'express';
import * as reportesPreciosController from '../controllers/precios.reportes.controller';
const router = Router();
//REPORTES DE PRECIOS
router.get('/precios/', reportesPreciosController.getReportePreciosList);

// para solo un id
router.get('/precios/:id', reportesPreciosController.getReportePreciosListItem);

router.get('/expiraciones/', reportesPreciosController.getReporteExpiracionList);

// para solo un id
router.get('/expiraciones/:id', reportesPreciosController.getReporteExpiracionListItem);

export default router;