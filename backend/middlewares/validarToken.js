const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const Usuario = require("../models/Usuario");

const validarToken = (req = request, res = response, next) => {
  const token = req.header("auth");
  if (!token) {
    return res.status(401).json({ msg: "Token inexistente" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.CLAVETOKEN);
    const usuario = Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({ msg: "Usuario inexistente" });
    }
    if (!usuario.estado) {
      return res.status(401).json({ msg: "Usuario inactivo" });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "No se pudo validar" });
  }
};

module.exports = validarToken;
