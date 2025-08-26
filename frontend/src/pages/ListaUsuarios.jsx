import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ListaUsuarios = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaUsuariosFiltrados, setListaUsuariosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(false);

  const eliminarUsuario = async (id) => {
    let conf = confirm(`Esta seguro de que quiere eliminar el usuario ${id} ?`);
    if (conf) {
      try {
        console.log(id);
        const resp = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
          method: "DELETE",
        });
        const data = await resp.json();
        if (!resp.ok) {
          alert(data.msg);
        } else {
          alert("Eliminacion exitosa");
          setListaUsuarios((prevUsuarios) =>
            prevUsuarios.filter((u) => u.id !== id)
          );
        }
        console.log(data.msg);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Eliminacion Cancelada");
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const resp = await fetch("http://localhost:5000/api/usuarios");
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(resp.msg);
        } else {
          setListaUsuarios(data.filter((usuario) => usuario.estado === true));
          setCargando(false);
          console.log(listaUsuariosFiltrados);
        }
      } catch (error) {
        console.log("error del servidor");
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="card shadow p-4">
      <div className="card-title text-center p-2">
        <h3>Lista de Usuarios</h3>
      </div>
      <div className="card-body">
        <div className="container text-center">
          {cargando ? (
            <h4>Cargando...</h4>
          ) : (
            <div className="table-responsive">
              <table
                cellPadding="8"
                style={{ borderCollapse: "collapse", width: "100%" }}
                className="table"
              >
                <thead style={{ borderBottom: 1 }}>
                  <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    {editando && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {listaUsuarios.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.dni}</td>
                      <td>{item.correo}</td>
                      <td>{item.rol}</td>
                      <td>
                        {editando && (
                          <input
                            type="button"
                            className="btn btn-danger btn-sm"
                            value="x"
                            onClick={() => eliminarUsuario(item.id)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editando ? (
                <input
                  type="button"
                  className="btn btn-warning btn-sm"
                  value="Terminar Edicion"
                  onClick={() => setEditando(false)}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-primary btn-sm"
                  value="Editar Lista"
                  onClick={() => setEditando(true)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaUsuarios;
