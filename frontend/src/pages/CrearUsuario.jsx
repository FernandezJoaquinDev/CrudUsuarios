import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const contraseña = "12345MISS";
const CrearUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    correo: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const volverAtras = () => {
    setForm({
      nombre: "",
      dni: "",
      correo: "",
    });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmPass = window.prompt("Ingrese la contraseña de administrador");
    if (confirmPass === contraseña) {
      const res = await fetch(
        "https://crudusuarios-8fll.onrender.com/api/usuarios",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.msg);
        throw new Error(data.msg);
      }
      console.log("usuario creado", data.nombre);
      alert("se creo el usuario correctamente");
      setForm({
        nombre: "",
        dni: "",
        correo: "",
      });
    } else {
      alert("contraseña incorrecta");
    }
  };

  return (
    <div className="card shadow p-4">
      <div className="text-start">
        <button className="btn btn-outline-dark" onClick={volverAtras}>
          <FaArrowLeft />
        </button>
      </div>
      <div className="card-title text-center p-2 border-bottom border-dark">
        <h3>Crear Usuario</h3>
      </div>
      <div className="card-body d-flex flex-column">
        <input
          name="nombre"
          type="text"
          placeholder="Ingrese nombre"
          className="form-control mb-4"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          name="dni"
          type="number"
          placeholder="Numero de Identificacion (DNI)"
          className="form-control mb-4"
          value={form.dni}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Correo"
          className="form-control mb-4"
          name="correo"
          value={form.correo}
          onChange={handleChange}
        />

        <input
          type="button"
          value="Cargar Datos"
          className="btn btn-lg btn-primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CrearUsuario;
