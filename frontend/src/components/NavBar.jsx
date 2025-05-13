import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <Link to="/" className="navbar-brand mb-0 ms-2 h1">
          CrudUsuarios
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
