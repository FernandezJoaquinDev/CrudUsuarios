const { request, response } = require("express");

const validarAdmin = (req = require, res = response, next) => {
  if (!req.usuario) {
    return res.status(401).json({ msg: "Token no valido" });
  }
  const { rol } = req.usuario;
  if (rol !== "ADM") {
    return res.status(401).json({ msg: "El usuario no es administrador" });
  }
  next();
};

module.exports = validarAdmin;
