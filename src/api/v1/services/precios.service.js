import Precios from '../models/Precios';
import precios from '../models/Precios';
import boom from '@hapi/boom';

export const getPreciosList = async () => {
  let preciosList;
  try {
    preciosList = await precios.find();
    return (preciosList);
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
      prodPrecioItem = await Precios.find({
        'IdListaOK': id,
      });
    }
     else if (keyType === 'BK') {
      prodPrecioItem = await Precios.findOne({
        'precios': {
          $elemMatch: {
            'IdPresentaOK': id,  // Buscar dentro del array 'precios' por 'IdPresentaOK'
          }
        }
      });
      if (prodPrecioItem) {
        // Buscar dentro del array 'precios' el elemento específico que coincida con el IdPresentaOK
        prodPrecioItem = prodPrecioItem.precios.find(p => p.IdPresentaOK === id);
      }
      }
    return prodPrecioItem;
  } catch (error) {
    throw boom.internal(error);
  }
};
//POST (ADD) Precios
export const postPreciosItem = async (paPrecioItem) => {
  try {
    const newPrecioItem = new precios(paPrecioItem);
    return await newPrecioItem.save();
  } catch (error) {
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

export const patchPreciosItem = async (id, paPrecioItem, fecha) => {
  try {
    console.log('MALR: PATCH API PRECIOS', id);

    const fechaActual = fecha || new Date();

    // Encuentra el precio activo en base a las fechas y el ID del producto
    const precioExistente = await Precios.findOne({
      'precios.IdProdServOK': id,
      FechaExpiraIni: { $lte: fechaActual },
      FechaExpiraFin: { $gte: fechaActual },
    });

    if (!precioExistente) {
      throw boom.notFound('No se encontró un precio activo para el producto.');
    }

    // Actualiza solo los campos que se proporcionan en `paPrecioItem`
    const { _id, ...fieldsToUpdate } = paPrecioItem;
    const updateResult = await Precios.updateOne(
      { _id: precioExistente._id },
      { $set: fieldsToUpdate }
    );

    return updateResult;
  } catch (error) {
    throw boom.badImplementation(error);
  }
};


export const putPreciosItem = async (id, paPrecioItem, fecha) => {
  try {
    console.log('MALR: PUT API PRECIOS', id);

    // Utiliza la fecha proporcionada o la actual si no se proporciona
    const fechaActual = fecha || new Date();

    // Buscar el precio actual que coincida con el id y cuyas fechas de expiración lo cubran
    const precioExistente = await Precios.findOne({
      'precios.IdProdServOK': id,
      FechaExpiraIni: { $lte: fechaActual },
      FechaExpiraFin: { $gte: fechaActual },
    });

    if (!precioExistente) {
      throw boom.notFound('No se encontró un precio activo para el producto.');
    }

    // Si se encuentra un precio, lo eliminamos
    await Precios.deleteOne({ _id: precioExistente._id });

    // Eliminar _id del nuevo precio si está presente
    const { _id, ...updatedFields } = paPrecioItem;

    // Insertar el nuevo precio con los campos proporcionados
    const nuevoPrecio = new Precios({
      ...updatedFields,
      'precios.IdProdServOK': id, // Aseguramos que el ID del producto sea el mismo
      FechaExpiraIni: fechaActual, // Fecha de inicio como la que se pasó o la actual
    });

    await nuevoPrecio.save();

    return nuevoPrecio;
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

    const deletedPrecio = await precios.findOneAndDelete({ 'precios.IdProdServOK': id, });

    return deletedPrecio;

  } catch (error) {
    throw boom.badImplementation(error);
  }
};