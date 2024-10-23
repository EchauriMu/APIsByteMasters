// prodPrecios.controller.js

import * as prodPreciosServices from '../services/ProdPrecios.service.js';
import boom from '@hapi/boom';

// Obtener todos los precios de una lista específica
export const getPreciosByLista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const preciosList = await prodPreciosServices.getPreciosByLista(id);
    if (!preciosList) {
      throw boom.notFound(`No se encontraron precios para la lista con ID ${id}`);
    }
    res.status(200).json(preciosList);
  } catch (error) {
    next(error);
  }
};

// Agregar un nuevo precio a una lista
export const postPrecioToLista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const precioData = req.body;
    const newPrecio = await prodPreciosServices.postPrecioToLista(id, precioData);
    if (!newPrecio) {
      throw boom.badRequest('No se pudo agregar el precio.');
    }
    res.status(201).json(newPrecio);
  } catch (error) {
    next(error);
  }
};

// Actualizar un precio específico en una lista
export const putPrecioInLista = async (req, res, next) => {
    try {
      const { id, idPrecios } = req.params; // id de la lista y id del precio
      const precioActualizado = req.body; // Datos que se van a actualizar
  
      const listaActualizada = await prodPreciosServices.putPrecioInLista(id, idPrecios, precioActualizado);
  
      res.status(200).json(listaActualizada);
    } catch (error) {
      next(error);
    }
};
