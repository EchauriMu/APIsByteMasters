// src/api/v1/controllers/promociones.controller.js

const cat_precios = require('../models/Precios'); // Asegúrate de la ruta correcta

// Obtener promociones por IdListaOK y FechaReg
exports.getPromociones = async (req, res) => {
  try {
    const { id } = req.params; // IdListaOK
    const { FechaReg } = req.query; // Recibimos FechaReg como parámetro opcional en la query

    // Buscamos la lista de precios por IdListaOK
    const listaPrecio = await cat_precios.findOne({
      IdListaOK: id,
      'detail_row.detail_row_reg.FechaReg': new Date(FechaReg) // Filtramos también por FechaReg
    });

    if (!listaPrecio) {
      return res.status(404).send({ message: 'Lista de precios no encontrada' });
    }

    res.status(200).send(listaPrecio.promociones);
  } catch (error) {
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};

// Crear una nueva promoción por IdListaOK
exports.postPromocion = async (req, res) => {
  try {
    const { id } = req.params; // IdListaOK
    const { tipo, descuento, condicion } = req.body;

    // Buscamos la lista de precios por IdListaOK
    const listaPrecio = await cat_precios.findOne({ IdListaOK: id });
    if (!listaPrecio) {
      return res.status(404).send({ message: 'Lista de precios no encontrada' });
    }

    // Obtener el ID máximo de las promociones existentes
    const promociones = listaPrecio.promociones;

    // Calcular el ID máximo solo si hay promociones
    const maxId = promociones.length > 0 
      ? Math.max(...promociones.map(promo => parseInt(promo._id) || 0)) // Aseguramos que el valor sea un número
      : 0;
    
    const nuevaPromocion = {
      _id: (maxId + 1).toString(), // Crear un nuevo ID basado en el máximo encontrado
      Activo: 'S',
      tipo,
      descuento,
      condicion,
      detail_row_reg: [{ FechaReg: new Date(), UsuarioReg: 'Sistema' }]
    };

    listaPrecio.promociones.push(nuevaPromocion);
    await listaPrecio.save();
    res.status(201).send(nuevaPromocion);
  } catch (error) {
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};

// Modificar una promoción existente por IdListaOK y idPromocion
exports.putPromocion = async (req, res) => {
  try {
    const { id, idPromocion } = req.params; // IdListaOK y id de la promoción
    const { tipo, descuento, condicion } = req.body;

    // Buscamos la lista de precios por IdListaOK
    const listaPrecio = await cat_precios.findOne({ IdListaOK: id });
    if (!listaPrecio) {
      return res.status(404).send({ message: 'Lista de precios no encontrada' });
    }

    // Buscamos la promoción dentro de la lista de precios
    const promocion = listaPrecio.promociones.id(idPromocion);
    if (!promocion) {
      return res.status(404).send({ message: 'Promoción no encontrada' });
    }

    // Actualizamos los campos de la promoción
    promocion.tipo = tipo || promocion.tipo;
    promocion.descuento = descuento || promocion.descuento;
    promocion.condicion = condicion || promocion.condicion;

    await listaPrecio.save();
    res.status(200).send(promocion);
  } catch (error) {
    res.status(500).send({ message: 'Error interno del servidor', error });
  }
};
