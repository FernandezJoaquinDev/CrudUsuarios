const mongoose = require("mongoose");

const conectar = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexion exitosa");
  } catch (error) {
    console.log("Error al conectar");
    process.exit(1); //detiene la app si falla la conexion
  }
};

module.exports = conectar;
