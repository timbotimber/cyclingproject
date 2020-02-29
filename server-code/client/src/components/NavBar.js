import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = props => {
  const logout = () => {
    axios.delete("/api/auth/logout").then(() => {
      props.setUser(null);
    });
  };

  if (props.user) {
    console.log(props.user.email);
    return (
      <nav className="navbar">
        <p>hey {props.user.email}</p>
        <div className="logo">Sykkel</div>
        <div className="account-links">
          <Link onClick={logout} to="/">
            Logout
          </Link>
          <Link to="/profile">my profile</Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <div className="logo">Sykkel</div>
        <div className="account-links">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </nav>
    );
  }
};

export default NavBar;
