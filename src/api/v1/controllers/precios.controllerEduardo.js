import * as preciosServices from '../services/precios.serviceEduardo';

//MALR: API GET
// controllers/precio.controller.js
const precioService = require('../services/precios.serviceEduardo');
const boom = require('@hapi/boom');

exports.getAllPrecios = async (req, res, next) => {
  try {
    const precios = await precioService.getAllPrecios();
    if (!precios || precios.length === 0) {
      throw boom.notFound('No se encontraron precios en la base de datos.');
    }
    res.status(200).json(precios);
  } catch (error) {
    next(error); // Esto pasará el error al middleware de manejo de errores
  }
};


// Función para obtener los precios por IdListaOK
exports.getPreciosByIdListaOK = async (req, res, next) => {
  const { idListaOK } = req.params; // Obtenemos el IdListaOK desde los parámetros de la URL

  try {
    // Llamamos al servicio para obtener los precios filtrados por el IdListaOK
    const precios = await precioService.getPreciosByIdListaOK(idListaOK);
    
    if (!precios || precios.length === 0) {
      // Si no se encuentran precios, devolvemos un error 404
      throw boom.notFound('No se encontraron precios con el IdListaOK proporcionado.');
    }
    
    // Si se encuentran precios, los enviamos en la respuesta
    res.status(200).json(precios);
  } catch (error) {
    // Pasamos cualquier error al middleware de manejo de errores
    next(error);
  }
};



//api para deletr la lista completa seleccionada
// Controlador para eliminar una lista de precios por idListaOK
exports.deleteListaPrecios = async (req, res, next) => {
  try {
    const { idListaOK } = req.params; // Obtenemos el idListaOK de los parámetros de la ruta

    // Llamamos al servicio para eliminar la lista
    const result = await precioService.deleteListaPrecios(idListaOK);

    if (!result) {
      throw boom.notFound(`No se encontró la lista de precios con idListaOK: ${idListaOK}`);
    }

    res.status(200).json({
      message: `Lista de precios con idListaOK: ${idListaOK} eliminada correctamente`,
      result,
    });
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};



// NUEVO: Función para crear una nueva lista de precios
exports.createListaPrecios = async (req, res, next) => {
  try {
    const datosLista = req.body; // Los datos de la lista de precios vienen en el cuerpo de la solicitud

    // Llamamos al servicio para crear la nueva lista de precios
    const resultado = await precioService.createListaPrecios(datosLista);

    // Si todo sale bien, respondemos con un mensaje de éxito
    res.status(201).json({
      message: 'Lista de precios creada correctamente.',
      result: resultado,
    });
  } catch (error) {
    next(error); // Pasa cualquier error al middleware de manejo de errores
  }
};