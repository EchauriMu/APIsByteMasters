import * as preciosServices from '../services/precios.service';
import boom from '@hapi/boom';
//MALR: API GET
const mongoose = require('mongoose');






// precios.controller.js
export const deleteListaPrecios = async (req, res, next) => {
  try {
    const { id } = req.params; // Obtén el ID desde los parámetros de la URL
    const trimmedId = id.trim(); // Recorta el ID para eliminar caracteres no deseados

    // Llama al servicio de eliminación usando IdListaOK
    const deletedLista = await preciosServices.eliminarListaPorIdListaOK(trimmedId);

    res.status(200).json({
      message: 'Lista de precios eliminada exitosamente.',
      data: deletedLista,
    });
  } catch (error) {
    console.error('Error al eliminar la lista de precios:', error); // Registro del error
    next(error); // Manejo de errores mediante el middleware de Express
  }
};








export const eliminarPrecio = async (req, res) => {
  try {
    const { id, idProdServ } = req.params; // Extrae los parámetros de la URL

    // Llama al servicio para eliminar el precio
    const resultado = await preciosServices.eliminarPrecio(id, idProdServ);

    if (!resultado) {
      return res.status(404).json({
        message: `No se encontró la lista con IdListaOK: ${id} o el precio con IdProdServOK: ${idProdServ}.`
      });
    }

    // Respuesta 200 OK con mensaje
    res.status(200).json({ message: 'Precio eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el precio:', error);
    res.status(500).json({ message: 'Error al eliminar el precio.', error });
  }
};






export const deletePromocion = async (req, res, next) => {
  try {
    // Extraer el ID de la lista de precios y el ID de la promoción desde los parámetros de la solicitud
    const { id: listaId, idPromocion } = req.params;

    // Llamar al servicio de eliminación de la promoción
    const deletedLista = await preciosServices.deletePromocion(listaId, idPromocion);

    // Retornar respuesta exitosa
    return res.status(200).json({
      message: "Promoción eliminada correctamente.",
      data: deletedLista,
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error al eliminar la promoción:', error);
    return res.status(500).json({ message: "Error al eliminar la promoción.", error: error.message });
  }
};


// Controlador para eliminar una alerta
export const eliminarAlerta = async (req, res) => {
  try {
    const { id, idAlerta } = req.params; // Extraemos los parámetros de la URL

    const resultado = await preciosServices.eliminarAlerta(id, idAlerta);

    if (!resultado) {
      return res.status(404).json({
        message: `No se encontró la lista con IdListaOK: ${id} o la alerta con _id: ${idAlerta}.`
      });
    }

    res.status(200).json({ message: 'Alerta eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la alerta:', error);
    res.status(500).json({ message: 'Error al eliminar la alerta.', error });
  }
};