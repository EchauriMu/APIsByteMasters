
import ListaPrecios from '../models/Precios';
import boom from '@hapi/boom';

export const getFullLISTAS = async () => {
  try {
    // Consulta todos los registros de la colección/precio.
    const listas = await ListaPrecios.find();

    // Validar si hay resultados
    if (!listas || listas.length === 0) {
      throw boom.notFound(`No se encontraron listas de precios.`);
    }

    return listas;
  } catch (error) {
    throw boom.internal('Error al obtener listas de precios', error);
  }
};



// Obtener el historial completo para un IdProdServOK específico
export const getFullHistorialByLista = async (IdProdServOK) => {
  try {
    // Busca la lista de precios usando el idLista
    const listaPrecios = await ListaPrecios.findOne({ 'IdListaOK': IdProdServOK }).select('historial');

    // Comprobar si se encontró la lista de historial y devolcer el historial
    if (!listaPrecios) {
      throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
    }

    return listaPrecios.historial ? listaPrecios.historial : [];
  } catch (error) {
    throw boom.internal(error);
  }
};



// Obtener el historial de un precio específico por IdPresentaOK
export const getHistorialByIdProdServ = async (IdProdServOK, IdPresentaOK) => {
  try {
    // Busca la lista de precios usando el idLista
    const listaPrecios = await ListaPrecios.findOne({ 'IdListaOK': IdProdServOK }).select('historial');

    // Comprobar si se encontró la lista de historial y devolver el historial filtrado
    if (!listaPrecios) {
      throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
    }

    // Filtrar el historial según IdPresentaOk
    const historialFiltrado = listaPrecios.historial.filter(item => item.IdPresentaOK === IdPresentaOK);

    return historialFiltrado;
  } catch (error) {
    throw boom.internal(error);
  }
  };

  
// Obtener el historial de un precio específico por IdPresentaOK
  export const getHistorialproductoregistro = async (IdProdServOK, IdPresentaOK,ID) => {
    try {
      // Busca la lista de precios usando el idLista
      const listaPrecios = await ListaPrecios.findOne({ 'IdListaOK': IdProdServOK }).select('historial');
  
      // Comprobar si se encontró la lista de historial y devolver el historial filtrado
      if (!listaPrecios) {
        throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
      }
  
      // Filtrar el historial según IdPresentaOk
      const historial = listaPrecios.historial.find(item => item.IdPresentaOK === IdPresentaOK);

      if (!historial) {
        throw boom.notFound(`Historial con IdPresentaOK ${IdPresentaOK} no encontrado`);
      }

      // Filtrar el historialItem según el ID
      const historialItem = historial.historial.find(item => item.Id === ID);

      if (!historialItem) {
        throw boom.notFound(`Elemento con ID ${ID} no encontrado en el historial`);
      }

      return historialItem;  // Devuelve el historialItem encontrado
    } catch (error) {
      throw boom.internal(error);
  }
};
//POS APIS
  //agregar  A historial de una presentacion
  export const addHistorialEntry = async (IdProdServOK, IdPresentaOK, newEntry) => {
    try {
      // Busca la lista de precios usando IdProdServOK
      
      const listaPrecios = await ListaPrecios.findOne({ 'IdListaOK': IdProdServOK });
  
      if (!listaPrecios) {
        throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
      }
  
      // Verificar si el historial existe para el IdPresentaOK dado
      const historialItem = listaPrecios.historial.find(item => item.IdPresentaOK === IdPresentaOK);
      
      if (!historialItem) {
        throw boom.notFound(`Historial con IdPresentaOK ${IdPresentaOK} no encontrado`);
      }
      console.log('Historial actualizado:', historialItem.historial);
      console.log('Documento completo antes de guardar:', JSON.stringify(newEntry, null, 2));

      // Agregar la nueva entrada al historial correspondiente
      historialItem.historial.push(newEntry);
      
      // Guardar los cambios en la base de datos
      await listaPrecios.save();
  
      return historialItem; // Retorna el historial actualizado
    } catch (error) {
      throw boom.internal(error);
    }
  };

 //AGREGAR A HISTORIAL UNA PRESENTACION 
  
  export const addHistorialObj = async (IdProdServOK, newEntry) => {
    try {
      // Busca la lista de precios usando IdProdServOK
      const listaPrecios = await ListaPrecios.findOne({ 'IdListaOK': IdProdServOK });
      console.log(newEntry); // Verifica que la estructura sea la correcta

      if (!listaPrecios) {
        throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
      }
      listaPrecios.historial.push(newEntry);
      // Verificar si el historial existe para el IdPresentaOK dado
  
      // Guardar los cambios en la base de datos
      await listaPrecios.save();
  
      return listaPrecios.historial; // Retorna el historial actualizado
    } catch (error) {
      throw boom.internal(error);
    }
  };


  export const deletehistorialproductoregistro = async (IdProdServOK, IdPresentaOK, ID) => {
      try {
        // Busca la lista de precios usando el idLista
        const listaPrecios = await ListaPrecios.findOne({ 'IdListaOK': IdProdServOK });
        1731893842127
        // Comprobar si se encontró la lista de precios
        if (!listaPrecios) {
          throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
        }
    
        // Filtrar el historial según IdPresentaOK
        const historial = listaPrecios.historial.find(item => item.IdPresentaOK === IdPresentaOK);
    
        // Comprobar si se encontró el historial
        if (!historial) {
          throw boom.notFound(`Historial con IdPresentaOK ${IdPresentaOK} no encontrado`);
        }
    
        // Filtrar el historialItem según el ID
        const initialLength = historial.historial.length;
        historial.historial = historial.historial.filter(item => item.Id !== ID);
    
        // Verificar si se eliminó algún elemento
        if (historial.historial.length === initialLength) {
          throw boom.notFound(`Elemento con ID ${ID} no encontrado en el historial`);
        }
    
        // Guardar los cambios en la base de datos
        await listaPrecios.save();
    
        return { message: `Elemento con ID ${ID} ha sido eliminado exitosamente del historial` };
      } catch (error) {
        throw boom.internal(error);
      }
    };
    
  
  // Eliminar un registro específico del historial por IdPresentaOK
  export const deleteHistorialByIdProdServ = async (IdProdServOK, IdPresentaOK) => {
    try {
      // Busca la lista de precios y elimina el registro filtrado por IdPresentaOK
      const result = await ListaPrecios.updateOne(
        { 'IdListaOK': IdProdServOK },
        { $pull: { 'historial': { 'IdPresentaOK': IdPresentaOK } } }
      );
  
      if (result.matchedCount === 0) {
        throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
      }
  
      if (result.modifiedCount === 0) {
        throw boom.notFound(`Registro con IdPresentaOK ${IdPresentaOK} no encontrado en el historial`);
      }
  
      return { message: 'Registro eliminado exitosamente' };
    } catch (error) {
      throw boom.internal(error);
    }
  };


  //PUT API
  // PUT para actualizar un historialItem específico por su ID
export const putHistorialProductoregistro = async (IdProdServOK, IdPresentaOK, ID, nuevoHistorialItem) => {
  try {
    // Busca la lista de precios usando el idLista
    const listaPrecios = await ListaPrecios.findOne({ 'IdListaOK': IdProdServOK }).select('historial');

    if (!listaPrecios) {
      throw boom.notFound(`Lista de precios con IdListaOK ${IdProdServOK} no encontrada`);
    }

    // Encuentra el historial con el IdPresentaOK
    const historial = listaPrecios.historial.find(item => item.IdPresentaOK === IdPresentaOK);

    if (!historial) {
      throw boom.notFound(`Historial con IdPresentaOK ${IdPresentaOK} no encontrado`);
    }

    // Encuentra el historialItem por su ID
    const historialItemIndex = historial.historial.findIndex(item => item.Id === ID);

    if (historialItemIndex === -1) {
      throw boom.notFound(`Elemento con ID ${ID} no encontrado en el historial`);
    }

    // Reemplaza el historialItem encontrado
    historial.historial[historialItemIndex] = nuevoHistorialItem;

    // Guarda la lista de precios con el historialItem actualizado
    await listaPrecios.save();

    return nuevoHistorialItem;
  } catch (error) {
    throw boom.internal(error);
  }
};
