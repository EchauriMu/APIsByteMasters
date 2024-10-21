//Commerce
import { Router } from 'express';
import config from '../../../config/config';
// Import Routes
import preciosRoutes from './precios.routes';
import reportesRoutes from './reportes.routes';
const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;
  app.use(api, router);
  // Routes
  router.use('/listas-precios', preciosRoutes);
  router.use('/reportes', reportesRoutes);
  //router.use('/reportes/precios', reportesRoutes);
  return router;
};
module.exports = routerAPI;