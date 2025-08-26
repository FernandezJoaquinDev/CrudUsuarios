const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El usuario es obligatorio"],
  },
  dni: {
    type: Number,
    required: [true, "El dni es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  rol: {
    type: String,
    default: "USER",
    //required: [true, "el usuario es requerido"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

usuarioSchema.methods.toJSON = function () {
  const { __v, _id, ...usuario } = this.toObject();
  usuario.id = _id;
  return usuario;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
