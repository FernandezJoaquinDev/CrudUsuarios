const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  dni: Number,
  correo: String,
});

module.exports = mongoose.model("Usuario", usuarioSchema);
