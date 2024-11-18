// ProdPrecios.service.js
import precios from '../models/Precios.js';
import boom from '@hapi/boom';


// Obtener todos los precios de una lista específic 
export const getPreciosByLista = async (idLista) => {
    try {
      // Busca la lista de precios usando el idLista
      const listaPrecios = await precios.findOne({ 'IdListaOK': idLista }).select('precios');
  
      // Comprobar si se encontró la lista de precios y devolver el array de precios
      if (!listaPrecios) {
        throw boom.notFound(`Lista de precios con IdListaOK ${idLista} no encontrada`);
      }
  
      return listaPrecios.precios ? listaPrecios.precios : [];
    } catch (error) {
      throw boom.internal(error);
    }
  };
  


// Agregar un nuevo precio a una lista específica
export const postPrecioToLista = async (id, nuevoPrecio) => {
    try {
      // Buscar la lista de precios por id
      const listaPrecios = await precios.findOne({ 'IdListaOK': id });
  
      // Si no se encuentra la lista, lanzar un error
      if (!listaPrecios) {
        throw boom.notFound(`No se encontró la lista de precios con el ID ${id}`);
      }
  
      // Agregar el nuevo precio al array de precios
      listaPrecios.precios.push(nuevoPrecio);
  
      // Guardar la lista actualizada
      await listaPrecios.save();
  
      // Devolver la lista de precios actualizada
      return listaPrecios; // Esto se devolverá al controlador
    } catch (error) {
      throw boom.internal(error); // Lanza un error interno si hay problemas
    }
  };
// Actualizar un precio específico dentro de una lista
export const putPrecioInLista = async (idLista, idPrecio, precioActualizado) => {
    try {
      // Buscar la lista de precios por id
      const listaPrecios = await precios.findOne({ 'IdListaOK': idLista });

      // Si no se encuentra la lista, lanzar un error
      if (!listaPrecios) {
        throw boom.notFound(`No se encontró la lista de precios con el ID ${idLista}`);
      }
  
      // Buscar el índice del precio que queremos actualizar
      const index = listaPrecios.precios.findIndex(precio => precio.IdPresentaOK === idPrecio);
      
      // Si no se encuentra el precio, lanzar un error
      if (index === -1) {
        throw boom.notFound(`No se encontró el precio con IdPresentaOK ${idPrecio}`);
      }
  
      // Actualizar el precio con los datos recibidos
      listaPrecios.precios[index] = { ...listaPrecios.precios[index], ...precioActualizado };
  
      // Guardar la lista actualizada
      await listaPrecios.save();
  
      // Devolver la lista de precios actualizada
      return listaPrecios; 
    } catch (error) {
      throw boom.internal(error);
    }
};

export const eliminarPrecio = async (idLista,idPrecio) => {
  try {
    // Buscar la lista de precios por id
    const listaPrecios = await precios.findOne({ 'IdListaOK': idLista });

    // Si no se encuentra la lista, lanzar un error
    if (!listaPrecios) {
        throw boom.notFound(`No se encontró la lista de precios con el ID ${idLista}`);
    }

    // Buscar el índice del precio que queremos eliminar
    const index = listaPrecios.precios.findIndex(precio => precio.IdPresentaOK === idPrecio);
    
    // Si no se encuentra el precio, lanzar un error
    if (index === -1) {
        throw boom.notFound(`No se encontró el precio con IdPresentaOK ${idPrecio}`);
    }

    // Eliminar el precio del arreglo `precios`
    listaPrecios.precios.splice(index, 1);

    // Guardar la lista actualizada en la base de datos
    await listaPrecios.save();

    // Devolver la lista de precios actualizada
    return listaPrecios; 
} catch (error) {
    throw boom.internal(error);
}
};