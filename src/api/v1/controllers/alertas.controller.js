import * as preciosServices from '../services/alertas.service';
import boom from '@hapi/boom';

export const getAlertas = async (req, res, next) => {
  const { id } = req.params;
  try {
    const alertas = await preciosServices.getAlertas(id);
    res.json(alertas);
  } catch (error) {
    next(error);
  }
};

export const postAlertaItem = async (req, res, next) => {
  const { id } = req.params;
  const nuevaAlerta = req.body;

  try {
    const alertaCreada = await preciosServices.postAlertaItem(id, nuevaAlerta);
    res.status(201).json(alertaCreada);
  } catch (error) {
    next(error);
  }
};

export const postAlertasList = async (req, res, next) => {
  const { id } = req.params;
  const alertasList = req.body;

  try {
    const alertasCreadas = await preciosServices.postAlertasList(id, alertasList);
    res.status(201).json(alertasCreadas);
  } catch (error) {
    next(error);
  }
};

export const putAlertasItem = async (req, res, next) => {
  const { id, alertaId } = req.params;
  const alertaData = req.body;

  try {
    const alertaActualizada = await preciosServices.putAlertasItem(id, alertaId, alertaData);
    res.status(200).json(alertaActualizada);
  } catch (error) {
    next(error);
  }
};