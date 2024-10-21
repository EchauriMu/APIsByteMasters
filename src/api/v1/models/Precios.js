const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para el registro de detalles
const detailRowRegSchema = new Schema({
  FechaReg: { type: Date, required: true },
  UsuarioReg: { type: String, required: true }
});

// Esquema para los detalles
const detailRowSchema = new Schema({
  Activo: { type: String, required: true },
  Borrado: { type: String, required: true },
  detail_row_reg: [detailRowRegSchema]
});

// Esquema para los precios
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

// Esquema para las promociones
const promocionSchema = new Schema({
  _id: { type: String, required: true }, 
  Activo: { type: String, required: true },
  Borrado: { type: String, required: true },
  tipo: { type: String, required: true },
  descuento: { type: Number, required: true },
  condicion: { type: String, required: true },
  detail_row_reg: [detailRowRegSchema] // Puedes reutilizar el schema existente
});

// Esquema para las listas de precios
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
  promociones: [promocionSchema] // Cambiado para usar el nuevo esquema
});

// Exportar el modelo
module.exports = mongoose.model('cat_precios', listaPreciosSchema, 'cat_precios');
