const express = require("express");
const login = require("../controllers/autenticationController");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/usuariosValidacion");

const router = express.Router();

router.post(
  "/login",
  [
    check("correo", "el correo es obligatorio").notEmpty(),
    check("correo", "el correo no es valido").isEmail(),
    check("contraseña", "la contraseña es obligatoria").notEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
