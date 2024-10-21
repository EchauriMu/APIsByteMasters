import * as preciosServices from '../services/precios.service';
import boom from '@hapi/boom';
//MALR: API GET

//Todos los Precios
export const getPreciosList = async (req, res, next) => {
    try{
      const PreciosList = await preciosServices.getPreciosList();
      if (!PreciosList) {
        throw boom.notFound('No se encontraron precios registrados.');
      } else if (PreciosList) {
        res.status(200).json(PreciosList);
      } 

      } catch(error) {
        next(error);
      }
    };
//MALR: Solo un Precio.
  export const getPrecioItem = async (req, res, next) => {
    try {
      //MALR: obtener parametro id mediante la
      //desestructuracion de objetos
      const { id } = req.params;
      //MALR: se obtiene parametro de la forma
      //clase/objeto.
      //const idProdServ = req.params.id;
    const keyType = req.query.keyType || 'OK';
    const precioItem = await preciosServices.getPreciosItem(id, keyType);
    if (!precioItem) {
      throw boom.notFound('No se encontraron precios registrados.');
    } else if (precioItem) {
      res.status(200).json(precioItem);
    }
  }catch(error){
    next(error);
  }
  };
  //MALR: POST ITEM
  export const postPreciosItem = async(req, res, next) =>{
    try{
      //Se guarda el Item
      const paPrecioItem = req.body;
      const newPrecioItem = await preciosServices.postPreciosItem(paPrecioItem);
      if (!newPrecioItem){
        //no se pudo crear el objeto
        throw boom.badRequest('No se pudo crear el Precio.');
      }else if (newPrecioItem){
        res.status(201).json(newPrecioItem)
      }
    } catch (error){
      next(error)
    }
  };

  //MALR: PUT ITEM
export const putPreciosItem = async(req, res, next) => {
  try{
    //El ide a sustituir
    const { id } = req.params;
      console.log('MALR: controller id ->',id);
    //El valor a actualizar
    const paPrecioItem = req.body;
    //La actualización
    const updatePrecioItem = await preciosServices.putPreciosItem(id,paPrecioItem);
    if(!updatePrecioItem){
      throw boom.badRequest('No se pudo actualizar el Precio');
    } else if(updatePrecioItem){
      res.status(200).json(updatePrecioItem)
    }
  } catch (error){
    next(error)
  }
};

// MALR: DELETE ITEM
export const deletePrecioItem = async(req, res, next) => {
  try{
    const {id} = req.params;
    const deletePrecioItem = await preciosServices.deletePrecioItem(id);
    if (!deletePrecioItem) {
      throw boom.badRequest('No se puede eliminar el Precio')
    } else if (deletePrecioItem){
      res.status(200).json(deletePrecioItem)
    }
  } catch (error) {
    next(error)
  }
}


// precios.controller.js

export const deleteListaPrecios = async (req, res, next) => {
  try {
    const { id } = req.params; // Obtén el ID de la lista desde los parámetros de la URL
    const trimmedId = id.trim(); // Recorta el ID para eliminar caracteres no deseados

    const deletedLista = await preciosServices.deleteListaPrecios(trimmedId); // Llama al servicio de eliminación

    res.status(200).json({
      message: 'Lista de precios eliminada exitosamente.',
      data: deletedLista,
    });
  } catch (error) {
    console.error('Error al eliminar la lista de precios:', error); // Registro del error
    next(error); // Manejo de errores mediante el middleware de Express
  }
};
