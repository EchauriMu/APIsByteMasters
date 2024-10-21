import Precios from '../models/Precios';
import precios from '../models/Precios';
import boom from '@hapi/boom';
  export const getPreciosList = async () => {
    let preciosList;
    try {
      preciosList = await precios.find();
          return(preciosList);
    } catch (error) {
      //res.status(500).json({ message: 'Error: ' + ficError });
      throw boom.internal(error);
    }
  };
  //optiene el id
  export const getPreciosItem = async (id, keyType) => {
    let prodPrecioItem;
  
    try {
      if (keyType === 'OK') {
        prodPrecioItem = await Precios.findOne({
          'precios.IdProdServOK': id, // Modificado para buscar dentro del array precios
        });
      } else if (keyType === 'BK') {
        prodPrecioItem = await Precios.findOne({
          'precios.IdProdServBK': id, // Modificado para buscar dentro del array precios
        });
      }
      return prodPrecioItem;
    } catch (error) {
      throw boom.internal(error);
    }
  };
  //POST (ADD) Precios
  export const postPreciosItem = async (paPrecioItem) => {
    try{
      const newPrecioItem = new precios(paPrecioItem);
      return await newPrecioItem.save();
    }catch (error){
      throw error;
    }
  };
  //PUT (MODIFITY) Precios
  // export const putPreciosItem = async (id, paPrecioItem) => {
  //   try{
  //     console.log('MALR: PUT API INSTITUTO',id);

  //     return await precios.findOneAndUpdate({'precios.IdProdServOK': id}, paPrecioItem, {new: true,});
  //   } catch (error) {
  //     throw boom.badImplementation(error);
  //   }
  // };

  export const putPreciosItem = async (id, paPrecioItem) => {
    try {
      console.log('MALR: PUT API INSTITUTO', id);
  
      // Eliminar _id de paPrecioItem si está presente
      const { _id, ...updatedFields } = paPrecioItem;
  
      // Realiza la actualización utilizando $set para modificar solo los campos deseados
      const updatedPrecio = await precios.findOneAndUpdate(
        { 'precios.IdProdServOK': id }, // Filtro para encontrar el precio específico
        { $set: updatedFields }, // Campos a actualizar
        { new: true, useFindAndModify: false } // Opciones para devolver el documento actualizado
      );
  
      return updatedPrecio;
    } catch (error) {
      throw boom.badImplementation(error);
    }
  };

  //DELETE Precios
  // export const deletePreciosItem = async (id) =>{
  //   try{
  //     //Encuentra el id y lo borra
  //     const deletePrecioItem = await precios.findByIdAndDelete({ 'precios.IdProdServOK': id },);
  //     if (!deletePrecioItem){
  //       throw boom.notFound(`Precio con _id ${id} no encontrado`)
  //     } else if (deletePrecioItem){
  //       return deletePrecioItem;
  //     }
  //   } catch (error) {
  //     throw boom.badImplementation(error)
  //   }
  // };

  // Si estás usando un ID personalizado, como IdProdServOK
export const deletePrecioItem = async (id) => {
  try {

    const deletedPrecio = await precios.findOneAndDelete({ 'precios.IdProdServOK': id ,});

    return deletedPrecio;

  } catch (error) {
    throw boom.badImplementation(error);
  }
};

// precios.service.js
import mongoose from 'mongoose';

// ...

export const deleteListaPrecios = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw boom.badRequest('Formato de ObjectId inválido');
  }

  try {
    const deletedLista = await Precios.findByIdAndDelete(id); // Busca por _id y elimina
    if (!deletedLista) {
      throw boom.notFound(`Lista de precios con ID ${id} no encontrada.`);
    }
    return deletedLista;
  } catch (error) {
    throw boom.badImplementation(error);
  }
};

