import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="logo">Sykkel</div>
      <div className="account-links">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    </nav>
  );
};

export default NavBar;
