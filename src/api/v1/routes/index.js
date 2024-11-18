//Commerce
import { Router } from 'express';
import config from '../../../config/config';

// Import Routes
import preciosRoutes from './precios.routes';
import prodPreciosRoutes from './prodPrecios.routes.js';
import preciosEliminarRoutes from './preciosEliminar.routes.js';
import alertasRoutes from './alertas.routes';
import reportesRoutes from './reportes.routes';
const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;
  app.use(api, router);
  // Routes
  //router.use('/listas-precios', preciosRoutes);

  router.use('/listas-precios', prodPreciosRoutes);
  router.use('/precios', preciosEliminarRoutes);
  router.use('/listas-precios', preciosRoutes);
  router.use('/listas-precios', alertasRoutes);
  router.use('/reportes', reportesRoutes);
  //router.use('/reportes/precios', reportesRoutes);
  return router;
};
module.exports = routerAPI;