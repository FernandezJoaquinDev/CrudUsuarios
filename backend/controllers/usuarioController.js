const Usuario = require("../models/Usuario");

const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const crearUsuario = async (req, res) => {
  const nuevo = new Usuario(req.body);
  await nuevo.save();
  res.json(nuevo);
};

module.exports = { obtenerUsuarios, crearUsuario };
