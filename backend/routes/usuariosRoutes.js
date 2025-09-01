const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/usuariosValidacion");
const router = express.Router();

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  buscarUsuario,
} = require("../controllers/usuarioController");

const { validarRol, validarId } = require("../helpers/db-validator");
const validarAdmin = require("../middlewares/validarAdmin");
const validarToken = require("../middlewares/validarToken");

router.get(
  "/:dni",
  [
    check("dni", "El dni debe ser un numero").isNumeric(),
    check("dni", "El campo no puede estar vacio").notEmpty(),
    check("dni", "El campo no puede ser cero").not().equals(0),
    validarCampos,
  ],
  buscarUsuario
);

router.get("/", obtenerUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("dni", "El dni es obligatorio").notEmpty(),
    check("correo", "Formato de correo invalido").isEmail(),
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
    //validarToken,
    //validarAdmin,
    check("id", "El formato del id es invalido").isMongoId(),
    check("id", "El id no corresponde a ningun usuario registrado").custom(
      validarId
    ),
    validarCampos,
  ],
  borrarUsuario
);

module.exports = router;
