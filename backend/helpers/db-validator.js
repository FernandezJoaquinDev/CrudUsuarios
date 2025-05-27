const Rol = require("../models/Rol");
const Usuario = require("../models/Usuario");

const validarRol = async (rol) => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la base de datos`);
  }
};
const validarId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no corresponde a ningun usuario`);
  }
};
module.exports = {
  validarRol,
  validarId,
};
