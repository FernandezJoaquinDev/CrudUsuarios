import React, { useState } from "react";

const CrearUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    correo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, dni: Number(form.dni) });
    const res = await fetch("http://localhost:5000/api/usuarios", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      throw new Error("error al crear usuario");
    }

    const data = await res.json();
    console.log("usuario creado", data);
    alert("se creo el usuario correctamente");
  };

  return (
    <div className="card shadow p-4">
      <div className="card-title text-center p-2">
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
