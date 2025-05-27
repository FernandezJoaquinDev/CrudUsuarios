const mongoose = require("mongoose");

const RolSchema = mongoose.Schema({
  rol: {
    type: String,
    required: [true, "El rol es requerido"],
  },
});

module.exports = mongoose.model("Rol", RolSchema);
