import * as reportePreciosServices from '../services/precios.reportes.service';
import boom from '@hapi/boom';
//MALR: API GET

//Todos los Precios hitoricos
export const getReportePreciosList = async (req, res, next) => {
    try{
      const ReportePreciosList = await reportePreciosServices.getReportePreciosList();
      if (!ReportePreciosList) {
        throw boom.notFound('No se encontraron precios registrados.');
      } else if (ReportePreciosList) {
        res.status(200).json(ReportePreciosList);
      } 

      } catch(error) {
        next(error);
      }
    };
//Da un listado de todas los precios historicos con uni o una presentación
  export const getReportePreciosListItem = async (req, res, next) => {
    try {
      const { id } = req.params;
    const keyType = req.query.keyType || 'OK';
    const ReportePreciosListItem = await reportePreciosServices.getReportePreciosListItem(id, keyType);
    if (!ReportePreciosListItem) {
      throw boom.notFound('No se encontraron precios registrados.');
    } else if (ReportePreciosListItem) {
      res.status(200).json(ReportePreciosListItem);
    }
  }catch(error){
    next(error);
  }
  };
  //Da un listado de todas los precios cuando expiran
  export const getReporteExpiracionList = async (req, res, next) => {
    try{
      const ReporteExpiracionList = await reportePreciosServices.getReporteExpiracionList();
      if (!ReporteExpiracionList) {
        throw boom.notFound('No se encontraron precios registrados.');
      } else if (ReporteExpiracionList) {
        res.status(200).json(ReporteExpiracionList);
      } 

      } catch(error) {
        next(error);
      }
    };
 
 //Da un listado del cuando expira el último precio
  export const getReporteExpiracionListItem = async (req, res, next) => {
    try {
      const { id } = req.params;

    const ReporteExpiracionListItem = await reportePreciosServices.getReporteExpiracionListItem(id);
    if (!ReporteExpiracionListItem) {
      throw boom.notFound('No se encontraron precios registrados.');
    } else if (ReporteExpiracionListItem) {
      res.status(200).json(ReporteExpiracionListItem);
    }
  }catch(error){
    next(error);
  }
  };