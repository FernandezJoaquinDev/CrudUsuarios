const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

const crearUsuario = async (req, res) => {
  // const nuevo = new Usuario(req.body);
  try {
    const { nombre, dni, correo, contraseña, rol } = req.body;
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
      return res.status(400).json({ msg: "el correo ya esta registrado" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);
    const nuevo = new Usuario({ nombre, dni, correo, contraseña: hash, rol });

    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear usuario" });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { correo, contraseña, ...resto } = req.body;
  if (contraseña) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);
    resto.contraseña = hash;
  }
  if (correo) {
    resto.correo = correo;
  }

  await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    msg: "Usuario actualizado",
  });
};

const borrarUsuario = async (req, res) => {
  const { id } = req.params;
  const encontrado = await Usuario.findById(id);
  if (!encontrado) {
    throw new Error("No se encontro el usuario con ese id");
  }

  await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    msg: "usuario eliminado",
  });
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
