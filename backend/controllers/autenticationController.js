const generarJWT = require("../helpers/generar-token");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(401)
        .json({ msg: "correo o contraseña incorrectos - usuario" });
    }
    if (!usuario.estado) {
      return res
        .status(401)
        .json({ msg: "correo o contraseña incorrectos - estado" });
    }
    const comparacion = bcrypt.compareSync(contraseña, usuario.contraseña);
    if (!comparacion) {
      return res
        .status(401)
        .json({ msg: "correo o contraseña incorrectos - contraseña" });
    }
    const token = await generarJWT(usuario.id);

    res.json({ msg: "Usuario Cargado", token });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Problemas de Administracion" });
  }
};

module.exports = login;
