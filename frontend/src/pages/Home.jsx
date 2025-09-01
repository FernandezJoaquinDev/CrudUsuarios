import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="card shadow p-4">
        <div className="card-title text-center p-2 border-bottom border-dark">
          <h3>Usuarios</h3>
        </div>

        <div className="card-body d-flex flex-column align-items-center mt-4">
          <div className="mb-4">
            <Link to="/crearUsuario" className="btn btn-dark btn-lg">
              Crear Usuario
            </Link>
          </div>
          <div className="mb-4">
            <Link to="/listaUsuarios" className="btn btn-dark btn-lg">
              Lista de Usuarios
            </Link>
          </div>
          <div>
            <Link to="/buscarUsuario" className="btn btn-dark btn-lg">
              Buscar Usuario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
