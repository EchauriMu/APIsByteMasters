const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de precios
const detailRowRegSchema = new Schema({
    FechaReg: { type: Date, required: true },
    UsuarioReg: { type: String, required: true }
  });
  
  const detailRowSchema = new Schema({
    Activo: { type: String, required: true },
    Borrado: { type: String, required: true },
    detail_row_reg: [detailRowRegSchema]
  });
  
  const precioSchema = new Schema({
    IdProdServOK: { type: String, required: true },
    IdPresentaOK: { type: String, required: true },
    IdTipoFormulaOK: { type: String, default: '' },
    Formula: { type: String, default: '' },
    CostoIni: { type: Number, required: true },
    CostoFin: { type: Number, required: true },
    Precio: { type: Number, required: true },
    detail_row: detailRowSchema
  });
  
  const listaPreciosSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    IdInstitutoOK: { type: String, required: true },
    IdListaOK: { type: String, required: true },
    IdListaBK: { type: String, required: true },
    DesLista: { type: String, required: true },
    FechaExpiraIni: { type: Date, required: true },
    FechaExpiraFin: { type: Date, required: true },
    IdTipoListaOK: { type: String, required: true },
    IdTipoGeneraListaOK: { type: String, required: true },
    IdTipoFormulaOK: { type: String, default: '' },
    precios: [precioSchema],
    detail_row: detailRowSchema,
    roles: { type: Array, default: [] },
    negocios: { type: Array, default: [] },
    promociones: { type: Array, default: [] }
  });
  
//   module.exports = mongoose.model('ListaPrecios', listaPreciosSchema);
module.exports = mongoose.model('cat_precios',   listaPreciosSchema, 'cat_precios');