import Precios from '../models/Precios';

// services/precio.service.js
const Precio = require('../models/Precios'); // Asegúrate de que el modelo esté correcto

// Servicio para manejar precios

export const postPrecio = async (listaPrecioId, precioData) => {
    // Buscar índice del precio en "precios"
    const listaPrecio = await Precio.findOne({ IdListaOK: listaPrecioId });

    if (!listaPrecio) {
        throw new Error(`No se encontró la lista de precios con IdListaOK: ${listaPrecioId}`);
    }

    const precioIndex = listaPrecio.precios.findIndex(
        (precio) => precio.IdPresentaOK === precioData.IdPresentaOK
    );

    if (precioIndex >= 0) {
        // Actualizar precio existente //error
        throw new Error(`Se intenta insertar un precio ya existente: ${precioData.IdPresentaOK}`);
        // listaPrecio.precios[precioIndex] = { 
        //     ...listaPrecio.precios[precioIndex], 
        //     ...precioData 
        // };
    } else {
        // Agregar nuevo precio
        listaPrecio.precios.push(precioData);
    }

    // Buscar el índice en "historial"
    const historialIndex = listaPrecio.historial.findIndex(
        (entry) => entry.IdPresentaOK === precioData.IdPresentaOK
    );

    // Crear nuevo historial
    const nuevoHistorial = {
        Id: String(new Date().getTime()), // ID único (puedes generar uno más robusto si es necesario)
        IdTipoFormulaOK: precioData.IdTipoFormulaOK,
        Formula: precioData.Formula,
        CostoIni: precioData.CostoIni,
        CostoFin: precioData.CostoFin,
        Precio: precioData.Precio,
        detail_row: precioData.detail_row,
    };

    if (historialIndex >= 0) {
        // Si ya existe, agrega el nuevo historial
        listaPrecio.historial[historialIndex].historial.push(nuevoHistorial);
    } else {
        // Si no existe, crea la estructura inicial del historial
        listaPrecio.historial.push({
            IdProdServOK: precioData.IdProdServOK,
            IdPresentaOK: precioData.IdPresentaOK,
            historial: [nuevoHistorial],
        });
    }

    // Guardar cambios
    await listaPrecio.save();
    return listaPrecio;
};

export const putPrecio = async (listaPrecioId, precioData) => {
    // Buscar índice del precio en "precios"
    const listaPrecio = await Precio.findOne({ IdListaOK: listaPrecioId });

    if (!listaPrecio) {
        throw new Error(`No se encontró la lista de precios con IdListaOK: ${listaPrecioId}`);
    }

    const precioIndex = listaPrecio.precios.findIndex(
        (precio) => precio.IdPresentaOK === precioData.IdPresentaOK
    );

    if (precioIndex >= 0) {
        // Actualizar precio existente //error
        
        listaPrecio.precios[precioIndex] = { 
            ...listaPrecio.precios[precioIndex], 
            ...precioData 
        };
    } else {
        // Agregar nuevo precio
        
        throw new Error(`Se intenta insertar un precio que no existe: ${precioData.IdPresentaOK}`);
    }

    // Buscar el índice en "historial"
    const historialIndex = listaPrecio.historial.findIndex(
        (entry) => entry.IdPresentaOK === precioData.IdPresentaOK
    );

    // Crear nuevo historial
    const nuevoHistorial = {
        Id: String(new Date().getTime()), // ID único (puedes generar uno más robusto si es necesario)
        IdTipoFormulaOK: precioData.IdTipoFormulaOK,
        Formula: precioData.Formula,
        CostoIni: precioData.CostoIni,
        CostoFin: precioData.CostoFin,
        Precio: precioData.Precio,
        detail_row: precioData.detail_row, 
        
    };

    if (historialIndex >= 0) {
        // Si ya existe, agrega el nuevo historial
        listaPrecio.historial[historialIndex].historial.push(nuevoHistorial);
    } else {
        // Si no existe, crea la estructura inicial del historial
        listaPrecio.historial.push({
            IdProdServOK: precioData.IdProdServOK,
            IdPresentaOK: precioData.IdPresentaOK,
            historial: [nuevoHistorial],
        });
    }

    // Guardar cambios
    await listaPrecio.save();
    return listaPrecio;
};

// export const putPrecio = async (listaPrecioId, precioData) => {
//     // Buscar la lista de precios por ID
//     const listaPrecio = await Precio.findOne({ IdListaOK: listaPrecioId });

//     if (!listaPrecio) {
//         throw new Error(`No se encontró la lista de precios con IdListaOK: ${listaPrecioId}`);
//     }

//     // Encontrar el índice del precio a actualizar (si existe)
//     const index = listaPrecio.precios.findIndex(
//         (precio) => precio.IdPresentaOK === precioData.IdPresentaOK
//     );

//     if (index >= 0) {
//         // Actualizar el precio existente //error
//         listaPrecio.precios[index] = { 
//             ...listaPrecio.precios[index], 
//             ...precioData 
//         };
//     } else {
//         // Agregar un nuevo precio
//         throw new Error(`Se intenta insertar un precio que no existe: ${precioData.IdPresentaOK}`);
//     }

//     // Guardar los cambios en la base de datos
//     await listaPrecio.save();

//     return listaPrecio;
// };

export const deletePrecio = async (listaPrecioId, IdPresentaOK) => {
    // Buscar la lista de precios por ID
    const listaPrecio = await Precio.findOne({ IdListaOK: listaPrecioId });

    if (!listaPrecio) {
        throw new Error(`No se encontró la lista de precios con IdListaOK: ${listaPrecioId}`);
    }

    // Filtrar los precios para eliminar el precio con el IdPresentaOK especificado
    const nuevoPrecios = listaPrecio.precios.filter(
        (precio) => precio.IdPresentaOK !== IdPresentaOK
    );

    if (nuevoPrecios.length === listaPrecio.precios.length) {
        throw new Error(`No se encontró el precio con IdPresentaOK: ${IdPresentaOK}`);
    }

    // Asignar la nueva lista de precios
    listaPrecio.precios = nuevoPrecios;

    // Guardar los cambios en la base de datos
    await listaPrecio.save();

    return listaPrecio;
};


