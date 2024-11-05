import Precios from '../models/Precios';
import boom from '@hapi/boom';

export const getAlertas = async (id) => {
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