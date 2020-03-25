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
        {props.user.firstName && (
          <div className="nav-greeting">
            <p>
              <span role="img" aria-label="wave">
                👋🏻
              </span>
              Hey {props.user.firstName}!
            </p>
          </div>
        )}
        <div className="logo">
          <Link to="/">Sykkel</Link>
        </div>
        <div className="nav-links">
          <Link to="/profile">Profile</Link>
          <Link to="/plotview">Plan</Link>

          <Link to="/trips">Explore</Link>
          <Link onClick={logout} to="/">
            Logout
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <div className="nav-greeting"></div>
        <div className="logo">
          <a href="/">Sykkel</a>
        </div>

        <div className="nav-links">
          <Link to="/plotview">Plan</Link>
          <Link to="/trips">Explore</Link>
          <Link to="/login">Log in</Link>
          <Link to="/signup">
            <button className="button-pill">Sign up</button>
          </Link>
        </div>
      </nav>
    );
  }
};

export default NavBar;
