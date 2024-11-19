import * as preciosHistorialService from '../services/precios.historial.service.js';

// Controlador para obtener el historial completo por IdProdServOK
export const getFullHistorialByLista = async (req, res) => {
  const { IdProdServOK } = req.params;

  try {
    const historial = await preciosHistorialService.getFullHistorialByLista(IdProdServOK);
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controlador para obtener el historial específico por IdPresentaOK
export const getHistorialByIdProdServ = async (req, res) => {
  const { IdProdServOK, IdPresentaOK } = req.params;

  try {
    const historial = await preciosHistorialService.getHistorialByIdProdServ(IdProdServOK, IdPresentaOK);
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//HIstorial 
export const getHistorialproductoregistro = async (req, res) => {
  const { IdProdServOK, IdPresentaOK,ID } = req.params;

  try {
    const historial = await preciosHistorialService.getHistorialproductoregistro(IdProdServOK, IdPresentaOK, ID);
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addHistorialObj = async (req, res) => {
  const {IdProdServOK} = req.params;
  const newEntry = req.body;
  console.log(req.params); // Verifica que la estructura sea la correcta
  console.log('Request body:', req.body);
  try {
    const addedHistorial = await preciosHistorialService.addHistorialObj(IdProdServOK,  newEntry);
    res.status(201).json(addedHistorial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addHistorialEntry = async (req, res) => {
  const { IdProdServOK, IdPresentaOK } = req.params;
  const newEntry2 = req.body;
  console.log(req.body); // Verifica que la estructura sea la correcta
  console.log('Request body:', req.body);

  try {
    const addedHistorial = await preciosHistorialService.addHistorialEntry(IdProdServOK, IdPresentaOK, newEntry2);
    res.status(201).json(addedHistorial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controlador para eliminar todo el historial de un IdProdServOK
export const deletehistorialproductoregistro = async (req, res) => {
  const { IdProdServOK, IdPresentaOK ,ID} = req.params;

  try {
    const result = await preciosHistorialService.deletehistorialproductoregistro(IdProdServOK, IdPresentaOK,ID);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json({ message: error.message });
  }
};

// Controlador para eliminar un registro específico del historial por IdPresentaOK
export const deleteHistorialByIdProdServ = async (req, res) => {
  const { IdProdServOK, IdPresentaOK } = req.params;

  try {
    const result = await preciosHistorialService.deleteHistorialByIdProdServ(IdProdServOK, IdPresentaOK);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.output?.statusCode || 500).json({ message: error.message });
  }
};

//PUT CONTROLLER
export const updateHistorialProductoregistro = async (req, res, next) => {
  const { IdProdServOK, IdPresentaOK, ID } = req.params;
  const nuevoHistorialItem = req.body;  // Asegúrate de que el cliente pase el objeto con el nuevo historialItem

  try {
    // Llamamos al servicio para actualizar el historialItem
    const updatedHistorialItem = await preciosHistorialService.putHistorialProductoregistro(IdProdServOK, IdPresentaOK, ID, nuevoHistorialItem);

    // Respondemos con el historialItem actualizado
    res.status(200).json({
      message: 'Elemento del historial actualizado correctamente',
      updatedHistorialItem
    });
  } catch (error) {
    // En caso de error, pasamos al middleware de manejo de errores
    next(error);
  }
};