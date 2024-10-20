const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Asegura que el nombre de usuario sea único
  },
  email: {
    type: String,
    required: true,
    unique: true, // Asegura que el correo electrónico sea único
    match: /.+\@.+\..+/ // Valida el formato del correo electrónico
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      role: {
        type: String,
        required: true,
      },
      permissions: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  detail_row: {
    Activo: {
      type: String,
      enum: ['S', 'N'], // Solo permite 'S' o 'N'
      default: 'S',
    },
    Borrado: {
      type: String,
      enum: ['S', 'N'], // Solo permite 'S' o 'N'
      default: 'N',
    },
    detail_row_reg: [
      {
        FechaReg: {
          type: Date,
          default: Date.now, // Establece la fecha actual como valor predeterminado
        },
        UsuarioReg: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

// Crea el modelo a partir del esquema
module.exports = mongoose.model('cat_usuarios',   userSchema, 'cat_usuarios');


