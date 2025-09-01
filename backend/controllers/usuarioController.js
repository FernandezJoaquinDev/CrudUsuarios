const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los datos" });
  }
};

const crearUsuario = async (req, res) => {
  // const nuevo = new Usuario(req.body);
  try {
    const { nombre, dni, correo } = req.body;
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
      return res.status(400).json({ msg: "el correo ya esta registrado" });
    }
    const existeDni = await Usuario.findOne({ dni });
    if (existeDni) {
      return res.status(400).json({ msg: "el dni ya esta registrado" });
    }
    const nuevo = new Usuario({ nombre, dni, correo });
    //const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear usuario" });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { correo, nombre, rol, estado, ...resto } = req.body;
  /*if (contraseña) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);
    resto.contraseña = hash;
  }*/
  if (correo) {
    resto.correo = correo;
  }
  if (nombre) {
    resto.nombre = nombre;
  }
  if (rol) {
    resto.rol = rol;
  }
  if (estado) {
    resto.estado = estado;
  }
  try {
    await Usuario.findByIdAndUpdate(id, resto);
    res.status(200).json({
      msg: "Usuario actualizado",
    });
  } catch (error) {
    res.status(400).json({ msg: "error del servidor" });
  }
};

const borrarUsuario = async (req, res) => {
  const { id } = req.params;
  const encontrado = await Usuario.findById(id);
  if (!encontrado) {
    throw new Error("No se encontro el usuario con ese id");
  }
  try {
    await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
      msg: "usuario eliminado",
    });
  } catch (error) {
    res.status(400).json({ msg: "Error en el servidor" });
  }
};

const buscarUsuario = async (req, res) => {
  const { dni } = req.params;
  const encontrado = await Usuario.findOne({ dni });
  if (!encontrado) {
    res.status(400).json({ msg: "el usuario no fue encontrado" });
  } else {
    res.status(200).json(encontrado);
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  buscarUsuario,
};
