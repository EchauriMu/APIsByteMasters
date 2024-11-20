"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var _default = exports["default"] = {
  HOST: process.env.HOST || '<<ERROR>> NO ENCONTRE EL HOST',
  PORT: process.env.PORT || '<<ERROR>> NO ENCONTRE EL PORT',
  API_URL: process.env.API_URL || '/api/v1',
  CONNECTION_STRING: process.env.CONNECTION_STRING || '<<ERROR>> NO SE ENCUENTRA',
  DATABASE: process.env.DATABASE || '<<ERROR>> NO SE ENCUENTRA',
  DB_PASSWORD: process.env.DB_PASSWORD || '<<ERROR>> NO SE ENCUENTRA',
  DB_USER: process.env.DB_USER || '<<ERROR>> NO SE ENCUENTRA'
}; //Se usa para cominicarse con .env para tener host, port o api url.