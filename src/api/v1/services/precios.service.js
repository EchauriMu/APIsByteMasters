import Precios from '../models/Precios';
import precios from '../models/Precios';
import boom from '@hapi/boom';


export const eliminarListaPorIdListaOK = async (idListaOK) => {
  try {
    const listaEliminada = await Precios.findOneAndDelete({ IdListaOK: idListaOK });
    return listaEliminada;
  } catch (error) {
    console.error('Error al eliminar la lista:', error);
    throw new Error('Ocurrió un error al intentar eliminar la lista.');
  }
};


// Servicio para eliminar un precio por ID de producto
export const eliminarPrecio = async (idLista, idProdServ) => {
  try {
    // Realiza la eliminación usando $pull
    const listaActualizada = await Precios.findOneAndUpdate(
      { IdListaOK: idLista }, // Busca la lista por ID
      { $pull: { precios: { IdProdServOK: idProdServ } } }, // Elimina el precio específico
      { new: true } // Devuelve el documento actualizado
    );

    return listaActualizada; // Devuelve la lista actualizada o null si no se encontró
  } catch (error) {
    console.error('Error en el servicio al eliminar el precio:', error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
};










export const deletePromocion = async (idLista, idPromocion) => {
  try {
    const listaActualizada = await Precios.findOneAndUpdate(
      { IdListaOK: idLista }, // Busca la lista por ID
      { $pull: { promociones: { _id: idPromocion } } }, // Elimina la promoción por ID
      { new: true } // Devuelve la lista actualizada
    );

    if (!listaActualizada) {
      throw boom.notFound(`No se encontró la lista con ID ${idLista} o la promoción con ID ${idPromocion}.`);
    }

    return listaActualizada;
  } catch (error) {
    throw boom.badImplementation('Error al eliminar la promoción.');
  }
};



// Servicio para eliminar una alerta por IdListaOK e idAlerta
export const eliminarAlerta = async (idLista, idAlerta) => {
  try {
    const listaActualizada = await Precios.findOneAndUpdate(
      { IdListaOK: idLista }, // Filtra por IdListaOK
      { $pull: { alertas: { _id: idAlerta } } }, // Elimina la alerta específica
      { new: true } // Devuelve la lista actualizada
    );

    return listaActualizada;
  } catch (error) {
    console.error('Error al eliminar la alerta:', error);
    throw error;
  }
};


