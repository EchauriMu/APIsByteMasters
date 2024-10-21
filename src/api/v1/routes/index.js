//Commerce
import { Router } from 'express';
import config from '../../../config/config'; // Importar configuración
import preciosRoutes from './precios.routes'; // Importar rutas de precios

const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL; // Ruta base desde la configuración

  // Asociar el router principal con la ruta base
  app.use(api, router);

  // Conectar las rutas de precios
  router.use('/precios', preciosRoutes);

  return router;
};

module.exports = routerAPI;
