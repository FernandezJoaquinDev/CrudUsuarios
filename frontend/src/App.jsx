import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CrearUsuario from "./pages/CrearUsuario";
import ListaUsuarios from "./pages/ListaUsuarios";
import BuscarUsuario from "./pages/BuscarUsuario";

function App() {
  const [form, setForm] = useState({
    nombre: "",
    dni: 0,
    constraseña: "",
  });

  return (
    <>
      <div className="contenedor-mayor">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CrearUsuario" element={<CrearUsuario />} />
            <Route path="/listaUsuarios" element={<ListaUsuarios />} />
            <Route path="/buscarUsuario" element={<BuscarUsuario />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
