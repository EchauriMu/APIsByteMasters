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
  export const getPreciosItem = async (id, keyType, fecha) => {
    let prodPrecioItem;
    try {
      if (keyType === 'OK') {
        prodPrecioItem = await Precios.findOne({
          'IdListaOK': id,
          FechaExpiraIni: { $lte: fecha },
          FechaExpiraFin: { $gte: fecha },
        });
      } else if (keyType === 'BK') {
        prodPrecioItem = await Precios.findOne({
          'precios.IdPresentaOK': id,
          FechaExpiraIni: { $lte: fecha },
          FechaExpiraFin: { $gte: fecha },
        } );

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

//------------------ A L E R T A S --------------------
export const getAlertasByListaId = async (id) => {
  try {
    const listaPrecios = await Precios.findOne({ 'IdListaOK': id });
    if (!listaPrecios) {
      throw boom.notFound('Lista de precios no encontrada');
    }
    return listaPrecios.alertas;
  } catch (error) {
    throw boom.internal(error);
  }
};

export const postAlertaItem = async (id, nuevaAlerta) => {
  try {
    const listaPrecios = await Precios.findOne({ IdListaOK: id });
    if (!listaPrecios) {
      throw boom.notFound('Lista de precios no encontrada');
    }
    listaPrecios.alertas.push(nuevaAlerta);

    await listaPrecios.save();

    return nuevaAlerta;
  } catch (error) {
    throw boom.internal(error);
  }
};

export const postAlertasList = async (id, alertasList) => {
  try {
    const listaPrecios = await Precios.findOne({ IdListaOK: id });
    if (!listaPrecios) {
      throw boom.notFound('Lista de precios no encontrada');
    }

    listaPrecios.alertas.push(...alertasList);

    await listaPrecios.save();

    return alertasList;
  } catch (error) {
    throw boom.internal(error);
  }
};

export const putAlertasItem = async (id, alertaId, alertaData) => {
  try {
    const listaPrecios = await Precios.findOne({ IdListaOK: id });
    if (!listaPrecios) {
      throw boom.notFound('Lista de precios no encontrada');
    }

    const alertaIndex = listaPrecios.alertas.findIndex(alerta => alerta._id === alertaId);
    if (alertaIndex === -1) {
      throw boom.notFound('Alerta no encontrada');
    }

    listaPrecios.alertas[alertaIndex] = { ...listaPrecios.alertas[alertaIndex], ...alertaData };
    await listaPrecios.save();

    return listaPrecios.alertas[alertaIndex];
  } catch (error) {
    throw boom.internal(error);
  }
};