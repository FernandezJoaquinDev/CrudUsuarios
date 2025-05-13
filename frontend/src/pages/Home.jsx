import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="card shadow p-4">
        <div className="card-title text-center p-3">
          <h3>Usuarios</h3>
        </div>
        <hr />
        <div className="card-body d-flex flex-column align-items-center">
          <div className="mb-4">
            <Link to="/crearUsuario" className="btn btn-dark btn-lg">
              Crear Usuario
            </Link>
          </div>
          <div className="mb-4">
            <Link to="/lista" className="btn btn-dark btn-lg">
              Lista de Usuarios
            </Link>
          </div>
          <div>
            <Link to="*" className="btn btn-dark btn-lg">
              Borrar Lista
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
