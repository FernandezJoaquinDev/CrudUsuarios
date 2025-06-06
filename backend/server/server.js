const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usuariosRoutes = require("../routes/usuariosRoutes");
const autenticationRoute = require("../routes/autenticationRoutes");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.middlewares();
    this.paths = {
      usuarios: "/api/usuarios",
      autentication: "/api/autentication",
    };
    this.conectarBD();
    this.routes();
  }
  async conectarBD() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("conectado");
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.usuarios, usuariosRoutes);
    this.app.use(this.paths.autentication, autenticationRoute);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
