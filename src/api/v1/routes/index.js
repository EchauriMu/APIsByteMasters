//Commerce
import { Router } from 'express';
import config from '../../../config/config';
// Import Routes
import preciosRoutes from './precios.routes';
const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;
  app.use(api, router);
  // Routes
  router.use('/precios', preciosRoutes);
  return router;
};
module.exports = routerAPI;