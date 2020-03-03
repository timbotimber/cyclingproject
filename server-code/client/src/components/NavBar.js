import React from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import App from "../App";

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
        <div className="logo">
          <Link to="/">Sykkel</Link>
        </div>
        <div className="account-links">
          <Link onClick={logout} to="/">
            Logout
          </Link>
          <Link to="/profile">Profile</Link>
          <Link to="/plotview">Plan</Link>

          <Link to="/trips">Explore</Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <div className="logo">
          <a href="/">Sykkel</a>
        </div>

        <div className="account-links">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/plotview">Plan</Link>
          <Link to="/trips">Explore</Link>
        </div>
      </nav>
    );
  }
};

export default NavBar;
