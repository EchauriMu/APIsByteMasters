import * as notasServices from '../services/notas.serviceJuan';
import boom from '@hapi/boom';

export const getNotas = async (req, res, next) => {
    const { id } = req.params;
    try {
        const notas = await notasServices.getNotas(id);
        res.json(notas);
    } catch (error) {
        next(error);
    }
};

export const postNotaItem = async (req, res, next) => {
    const { id } = req.params;
    const nuevaNota = req.body;

    try {
        const notaCreada = await notasServices.postNotaItem(id, nuevaNota);
        res.status(201).json(notaCreada);
    } catch (error) {
        next(error);
    }
};

export const postNotasList = async (req, res, next) => {
    const { id } = req.params;
    const notasList = req.body;

    try {
        const notasCreadas = await notasServices.postNotasList(id, notasList);
        res.status(201).json(notasCreadas);
    } catch (error) {
        next(error);
    }
};

export const putNotaItem = async (req, res, next) => {
    const { id, notaId } = req.params;
    const notaData = req.body;

    try {
        const notaActualizada = await notasServices.putNotaItem(id, notaId, notaData);
        res.status(200).json(notaActualizada);
    } catch (error) {
        next(error);
    }
};
