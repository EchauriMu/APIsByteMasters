"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = require("express");
var _config = _interopRequireDefault(require("../../../config/config"));
var _precios = _interopRequireDefault(require("./precios.routes"));
// Importación de módulos necesarios

// Importación de rutas de precios

var routerAPI = function routerAPI(app) {
  var router = (0, _express.Router)();
  var api = _config["default"].API_URL; // Obtener la URL base desde la configuración
  app.use(api, router); // Aplicar el prefijo base a todas las rutas

  // Definir las rutas
  router.use('/listas-precios', _precios["default"]); // Ruta de precios

  return router;
};
module.exports = routerAPI; // Exportación del router