import React from "react";
import ReactDOM from "react-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="logo">Sykkel</div>
      <div className="account-links">
        <a href="#">Log in</a>
        <a href="#">Sign up</a>
      </div>
    </nav>
  );
};

export default NavBar;
