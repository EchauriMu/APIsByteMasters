const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de precios
const detailRowRegSchema = new Schema({
  FechaReg: {
    type: Date,
    required: true
  },
  UsuarioReg: {
    type: String,
    required: true
  }
});

const detailRowSchema = new Schema({
  Activo: {
    type: String,
    enum: ['S', 'N'],
    default: 'S'
  },
  Borrado: {
    type: String,
    enum: ['S', 'N'],
    default: 'N'
  },
  detail_row_reg: [detailRowRegSchema]
});

const precioSchema = new Schema({
  IdProdServOK: {
    type: String,
    required: true
  },
  IdPresentaOK: {
    type: String,
    required: true
  },
  IdTipoFormulaOK: {
    type: String,
    default: ''
  },
  Formula: {
    type: String,
    default: ''
  },
  CostoIni: {
    type: Number,
    required: true
  },
  CostoFin: {
    type: Number,
    required: true
  },
  Precio: {
    type: Number,
    required: true
  },
  detail_row: detailRowSchema
});

const promocionSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  Activo: {
    type: String,
    enum: ['S', 'N'],
    default: 'S'
  },
  Borrado: {
    type: String,
    enum: ['S', 'N'],
    default: 'N'
  },
  tipo: {
    type: String,
    enum: ['descuento_volumen', 'descuento_personalizado'],
    required: true
  },
  descuento: {
    type: Number,
    required: true
  },
  condicion: {
    type: String,
    required: true
  },
  detail_row_reg: [detailRowRegSchema]
});

const alertaSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  Activo: {
    type: String,
    enum: ['S', 'N'],
    default: 'S'
  },
  Borrado: {
    type: String,
    enum: ['S', 'N'],
    default: 'N'
  },
  fecha: {
    type: Date,
    required: true
  },
  reporte: {
    type: Boolean,
    default: true
  },
  mensaje: {
    type: String,
    required: true
  },
  detail_row_reg: [detailRowRegSchema]
});

const listaPreciosSchema = new Schema({
  IdInstitutoOK: {
    type: String,
    required: true
  },
  IdListaOK: {
    type: String,
    required: true
  },
  IdListaBK: {
    type: String,
    required: true
  },
  DesLista: {
    type: String,
    required: true
  },
  FechaExpiraIni: {
    type: Date,
    required: true
  },
  FechaExpiraFin: {
    type: Date,
    required: true
  },
  IdTipoListaOK: {
    type: String,
    required: true
  },
  IdTipoGeneraListaOK: {
    type: String,
    required: true
  },
  IdTipoFormulaOK: {
    type: String,
    default: ''
  },
  precios: [precioSchema],
  roles: {
    type: [String],
    enum: ['admin', 'gestor_precios', 'usuario'],
    default: []
  },
  detail_row: detailRowSchema,
  negocios: {
    type: [String],
    default: []
  },
  promociones: [promocionSchema],
  alertas: [alertaSchema]
});

//   module.exports = mongoose.model('ListaPrecios', listaPreciosSchema);
module.exports = mongoose.model('cat_precios',   listaPreciosSchema, 'cat_precios');