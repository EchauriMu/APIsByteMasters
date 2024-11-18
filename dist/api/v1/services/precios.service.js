"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreciosByIdListaOK = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Precios = _interopRequireDefault(require("../models/Precios"));
// services/precio.service.js
var Precio = require('../models/Precios'); // Asegúrate de que el modelo esté correcto

exports.getAllPrecios = /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var _precios;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return Precio.find({}, {
          IdInstitutoOK: 1,
          IdListaOK: 1,
          IdListaBK: 1,
          DesLista: 1,
          FechaExpiraIni: 1,
          FechaExpiraFin: 1,
          IdTipoListaOK: 1,
          IdTipoGeneraListaOK: 1,
          IdTipoFormulaOK: 1
        });
      case 3:
        _precios = _context.sent;
        return _context.abrupt("return", _precios);
      case 7:
        _context.prev = 7;
        _context.t0 = _context["catch"](0);
        throw new Error('Error al obtener los precios: ' + _context.t0.message);
      case 10:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 7]]);
}));

// Función para obtener los precios por IdListaOK
var getPreciosByIdListaOK = exports.getPreciosByIdListaOK = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(idListaOK) {
    var listaPrecio;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Precios["default"].findOne({
            'IdListaOK': idListaOK
          }, {
            precios: 1 // Solo seleccionamos el campo "precios"
          });
        case 3:
          listaPrecio = _context2.sent;
          if (listaPrecio) {
            _context2.next = 6;
            break;
          }
          throw new Error('Lista de precios no encontrada.');
        case 6:
          return _context2.abrupt("return", listaPrecio.precios);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw new Error('Error al obtener los precios: ' + _context2.t0.message);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getPreciosByIdListaOK(_x) {
    return _ref2.apply(this, arguments);
  };
}();