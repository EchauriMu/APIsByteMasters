"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var preciosServices = _interopRequireWildcard(require("../services/precios.service"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
//MALR: API GET
// controllers/precio.controller.js
var precioService = require('../services/precios.service');
var boom = require('@hapi/boom');
exports.getAllPrecios = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var precios;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return precioService.getAllPrecios();
        case 3:
          precios = _context.sent;
          if (!(!precios || precios.length === 0)) {
            _context.next = 6;
            break;
          }
          throw boom.notFound('No se encontraron precios en la base de datos.');
        case 6:
          res.status(200).json(precios);
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          next(_context.t0); // Esto pasará el error al middleware de manejo de errores
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Función para obtener los precios por IdListaOK
exports.getPreciosByIdListaOK = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var idListaOK, precios;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          idListaOK = req.params.idListaOK; // Obtenemos el IdListaOK desde los parámetros de la URL
          _context2.prev = 1;
          _context2.next = 4;
          return precioService.getPreciosByIdListaOK(idListaOK);
        case 4:
          precios = _context2.sent;
          if (!(!precios || precios.length === 0)) {
            _context2.next = 7;
            break;
          }
          throw boom.notFound('No se encontraron precios con el IdListaOK proporcionado.');
        case 7:
          // Si se encuentran precios, los enviamos en la respuesta
          res.status(200).json(precios);
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          // Pasamos cualquier error al middleware de manejo de errores
          next(_context2.t0);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();