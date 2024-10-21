//Commerce
import { Router } from 'express';
import config from '../../../config/config';
// Import Routes
import preciosRoutes from './precios.routes';
import alertasRoutes from './alertas.routes';
const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;
  app.use(api, router);
  // Routes
  router.use('/listas-precios', preciosRoutes);
  router.use('/listas-precios', alertasRoutes);
  return router;
};
module.exports = routerAPI;