import precios from '../models/Precios';
import boom from '@hapi/boom';
//MALR
    //Da un listado de todas los precios historicos
  export const getReportePreciosList = async () => {
    let reportePreciosList;
    try {
        reportePreciosList = await precios.find({  },
        { 
          IdListaOK: 1,
          FechaExpiraIni: 1,
          FechaExpiraFin: 1,
          precios: 1
        });
          return(reportePreciosList);
    } catch (error) {
      throw boom.internal(error);
    }
  };

 
    //Da un listado de todas los precios historicos con uni o una presentación
  export const getReportePreciosListItem = async (id, keyType) => {
    let reportePreciosListItem;
    try {
      if (keyType === 'OK') {
        reportePreciosListItem = await precios.find({
          'IdListaOK': id,
          
        },{ 
            IdListaOK: 1,
            FechaExpiraIni: 1,
            FechaExpiraFin: 1,
            precios: 1
          });
      } else if (keyType === 'BK') {
        reportePreciosListItem = await precios.find({
          'precios.IdPresentaOK': id,
        },
        { 
            IdListaOK: 1,
            FechaExpiraIni: 1,
            FechaExpiraFin: 1,
            precios: {
                $elemMatch: { "IdPresentaOK": id }
            }
          } 
          );

      }
      return reportePreciosListItem;
    } catch (error) {
      throw boom.internal(error);
    }
  };
  //Da un listado de todas los precios cuando expiran
  export const getReporteExpiracionList = async () => {
    let fechaExpiracionList;
    try {
        fechaExpiracionList = await precios.aggregate([
            {
              $group: {
                _id: "$IdListaOK",  // Agrupa por IdListaOK
                maxFechaExpiraFin: { $max: "$FechaExpiraFin" },  // Encuentra la fecha de expiración más alta
                doc: { $first: "$$ROOT" }  // Toma el documento completo
              }
            },
            {
              $project: {
                _id: 0,  // No mostrar el campo _id del grupo
                IdListaOK: "$_id",  // Mostrar IdListaOK
                originalId: "$doc._id",  // Incluye el _id original
                FechaExpiraFin: "$maxFechaExpiraFin",  // Lista de precios
              }
            }
          ]);
          return(fechaExpiracionList);
    } catch (error) {
      throw boom.internal(error);
    }
  };

 
 //Da un listado del cuando expira el último precio
  export const getReporteExpiracionListItem = async (id) => {
    let fechaExpiracionItem;
    try {
        fechaExpiracionItem = await precios.find(
        {'IdListaOK': id},
        {
            _id: 1,
            FechaExpiraIni: 1,
            FechaExpiraFin: 1,
         }
         )
        .sort({ FechaExpiraFin: -1 }) // Ordena por FechaExpiraFin en orden descendente
        .limit(1);
      
      return fechaExpiracionItem;
    } catch (error) {
      throw boom.internal(error);
    }
  };