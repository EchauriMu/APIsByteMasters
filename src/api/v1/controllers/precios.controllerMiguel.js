const precioService = require('../services/precios.serviceMiguel');
const boom = require('@hapi/boom');

exports.postPrecio = async (req, res, next) => {
    try {
      const listaPrecioId = req.params.idListaOK;
      const precioData = req.body; // Los datos de la lista de precios vienen en el cuerpo de la solicitud
  
      // Llamamos al servicio para crear la nueva lista de precios
      const resultado = await precioService.postPrecio(listaPrecioId, precioData);
  
      // Si todo sale bien, respondemos con un mensaje de éxito
      res.status(200).json({
        message: 'Precio creado correctamente.',
        result: resultado,
      });
    } catch (error) {
      next(error); // Pasa cualquier error al middleware de manejo de errores
    }
  };

  exports.putPrecio = async (req, res, next) => {
    try {
      const listaPrecioId = req.params.idListaOK;
      const precioData = req.body; // Los datos de la lista de precios vienen en el cuerpo de la solicitud
  
      // Llamamos al servicio para crear la nueva lista de precios
      const resultado = await precioService.putPrecio(listaPrecioId, precioData);
  
      // Si todo sale bien, respondemos con un mensaje de éxito
      res.status(200).json({
        message: 'Precio actualizado correctamente.',
        result: resultado,
      });
    } catch (error) {
      next(error); // Pasa cualquier error al middleware de manejo de errores
    }
  };

  exports.deletePrecio = async (req, res, next) => {
    try {
      const listaPrecioId = req.params.idListaOK;
      const IdPresentaOK = req.params.IdPresentaOK;
  
      // Llamamos al servicio para crear la nueva lista de precios
      const resultado = await precioService.deletePrecio(listaPrecioId, IdPresentaOK);
  
      // Si todo sale bien, respondemos con un mensaje de éxito
      res.status(200).json({
        message: 'Precio eliminado correctamente.',
        result: resultado,
      });
    } catch (error) {
      next(error); // Pasa cualquier error al middleware de manejo de errores
    }
  };