import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BuscarUsuario = () => {
  const [dniBuscado, setDniBuscado] = useState("");
  const [encontrado, setEncontrado] = useState({
    nombre: "",
    correo: "",
    estado: false,
    rol: "USER",
  });
  const [estado, setEstado] = useState(false);
  const navigate = useNavigate();

  const handleChangeDni = (e) => {
    setDniBuscado(e.target.value);
  };

  const handleChangeEdit = (e) => {
    setEncontrado({ ...encontrado, [e.target.name]: e.target.value });
  };

  const cancelarEdicion = () => {
    setEncontrado({});
    navigate("/");
  };

  const confirmarEdicion = async () => {
    if (encontrado.nombre !== "") {
      const conf = confirm(
        `Realmente desea actualizar la informacion del usuario ${encontrado.nombre}`
      );
      if (conf && encontrado) {
        console.log(encontrado);

        const resp = await fetch(
          `http://localhost:5000/api/usuarios/${encontrado.id}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(encontrado),
          }
        );
        navigate("/");
      } else {
        alert("Se cancelo la actualizacion de datos");
        cancelarEdicion();
      }
    } else {
      alert("no se encontro ningun usuario para modificar");
    }
  };
  const volverHome = () => {
    setEncontrado({
      nombre: "",
      correo: "",
      estado: false,
      rol: "USER",
    });
    setDniBuscado(0);
    navigate("/");
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(Number(dniBuscado));
    if (dniBuscado != 0) {
      const resp = await fetch(
        `http://localhost:5000/api/usuarios/${Number(dniBuscado)}`
      );
      if (!resp.ok) {
        const errorData = await resp.json();
        console.log("error del servidor: ", errorData.msg);
        return;
      }
      const data = await resp.json();
      if (data) {
        setEncontrado(data);
        setEstado(true);
      } else {
        console.log(error);
      } //controlar el caso de que el usuario no se encuentre
      console.log(data);
    } else {
      alert("El dni no puede estar vacio");
    }
  };

  return (
    <div className="card shadow p-4">
      <div className="text-start">
        <button className="btn btn-outline-dark" onClick={volverHome}>
          <FaArrowLeft />
        </button>
      </div>
      <div className="card-title text-center p-2 border-bottom border-dark">
        <h3>Buscar Usuario</h3>
      </div>
      <div className="card-body">
        <div className="container  text-center border-bottom p-1">
          <input
            type="number"
            className="form-group"
            onChange={handleChangeDni}
            placeholder="Ingrese el Dni del usuario"
            value={dniBuscado}
          />
          <input
            type="submit"
            className="btn btn-primary ms-2"
            value="Buscar"
            onClick={handleSearch}
          />
        </div>
        <div className="container flex-column d-flex mt-3">
          <div className="mb-3">
            <span className="me-1">Nombre: </span>
            <input
              name="nombre"
              type="text"
              value={encontrado.nombre}
              onChange={handleChangeEdit}
            />
          </div>
          <div className="mb-3">
            <span className="me-1">Correo: </span>
            <input
              type="text"
              value={encontrado.correo}
              name="correo"
              onChange={handleChangeEdit}
            />
          </div>
          <div className="mb-3">
            <span className="me-1">Estado: </span>
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {encontrado.estado ? "Activo" : "Inactivo"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    setEncontrado({ ...encontrado, estado: true })
                  }
                >
                  Activar
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    setEncontrado({ ...encontrado, estado: false })
                  }
                >
                  Inactivar
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-3">
            <span className="me-1">Rol: </span>
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {encontrado.rol === "ADMIN" ? "Administrador" : "Usuario"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    setEncontrado({ ...encontrado, rol: "ADMIN" })
                  }
                >
                  Administrador
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => setEncontrado({ ...encontrado, rol: "USER" })}
                >
                  Usuario
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-2">
            <button className="btn btn-danger me-5" onClick={cancelarEdicion}>
              Cancelar
            </button>
            <button className="btn btn-success" onClick={confirmarEdicion}>
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscarUsuario;
