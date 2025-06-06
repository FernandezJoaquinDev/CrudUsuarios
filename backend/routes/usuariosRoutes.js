const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/usuariosValidacion");
const router = express.Router();

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarioController");

const { validarRol, validarId } = require("../helpers/db-validator");
const validarAdmin = require("../middlewares/validarAdmin");
const validarToken = require("../middlewares/validarToken");

router.get("/", obtenerUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("dni", "El dni es obligatorio").notEmpty(),
    check("correo", "Formato de correo invalido").isEmail(),
    check(
      "contraseña",
      "La contraseña debe tener un minimo de 5 caracteres"
    ).isLength({ min: 5 }),
    check("rol").custom(validarRol),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    check("id", "El formato del id es invalido").isMongoId(),
    check("id", "El id no corresponde a ningun usuario registrado").custom(
      validarId
    ),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete(
  "/:id",
  [
    validarToken,
    validarAdmin,
    check("id", "El formato del id es invalido").isMongoId(),
    check("id", "El id no corresponde a ningun usuario registrado").custom(
      validarId
    ),
    validarCampos,
  ],
  borrarUsuario
);

module.exports = router;
