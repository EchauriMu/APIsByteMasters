import ListaPrecios from '../models/Precios'; // Usamos el modelo correcto

// Obtener promociones de una lista de precios por IdListaOK
export const getPromocionesList = async (IdListaOK) => {
    // Buscar la lista de precios por IdListaOK
    const listaPrecios = await ListaPrecios.findOne({
        IdListaOK: IdListaOK
    });
    
    if (!listaPrecios) {
        throw new Error('Lista de promociones no encontrada');
    }
    
    return listaPrecios.promociones; // Retorna el array de promociones
};

// Obtener promociones de una lista de precios por IdListaOK y FechaReg
export const getPromocionesListDate = async (IdListaOK, FechaReg) => {
    // Buscar la lista de precios por IdListaOK y FechaReg
    const listaPrecios = await ListaPrecios.findOne({
        IdListaOK: IdListaOK,
        'detail_row.detail_row_reg.FechaReg': new Date(FechaReg)
    });
    
    if (!listaPrecios) {
        throw new Error('Lista de promociones no encontrada');
    }
    
    return listaPrecios.promociones; // Retorna el array de promociones
};

// Crear nuevas promociones para una lista de precios
export const postPromocion = async (IdListaOK, FechaReg, promocionData) => {
    // Buscar la lista de precios por IdListaOK y FechaReg
    const listaPrecios = await ListaPrecios.findOne({
        IdListaOK: IdListaOK,
        'detail_row.detail_row_reg.FechaReg': new Date(FechaReg)
    });

    if (!listaPrecios) {
        throw new Error('Lista de promociones no encontrada');
    }
    
    // Añadir la nueva promoción al array de promociones
    listaPrecios.promociones.push(promocionData);

    // Guardar los cambios
    return await listaPrecios.save();
};

// Modificar promociones existentes en una lista de precios
export const putPromocion = async (IdListaOK, FechaReg, idPromocion, promocionData) => {
    // Buscar la lista de precios por IdListaOK y FechaReg
    const listaPrecios = await ListaPrecios.findOne({
        IdListaOK: IdListaOK,
        'detail_row.detail_row_reg.FechaReg': new Date(FechaReg)
    });

    if (!listaPrecios) {
        throw new Error('Lista de promociones no encontrada');
    }

    // Buscar la promoción específica por su _id dentro del array de promociones
    const promocion = listaPrecios.promociones.id(idPromocion);
    
    if (!promocion) {
        throw new Error('Promoción no encontrada');
    }
    
    // Actualizar los campos de la promoción
    promocion.set(promocionData);

    // Guardar los cambios
    return await listaPrecios.save();
};
